<template>
  <section>
    <canvas
      id="viewer"
      @click="pick"
      @contextmenu="contextMenu"
      class="viewer-wrapper"
    />
    <Sidebar
      :unactive-postgres="unActivePostgres"
      @handle-active="handleActiveAction"
    />
    <ContextMenu
      v-if="showContextMenu"
      @click-context-menu="checkAction"
      @hide-context-menu="showContextMenu = false"
      :style="`top:${yPosition}px; left:${xPosition}px`"
      :actions="['Isolate', 'Hide', 'Wireframe']"
    />
    <PostgresModal v-if="showPostgresModal" @hide-modal="unActiveModal" />
    <input
      type="file"
      ref="input"
      style="display: none"
      @change="fileChanged"
      accept="*.ifc"
    />
    <p class="viewer-properties-text" v-text="`ID: ${id}`" />
  </section>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'
import IfcManager from '@/controllers/IFC/IfcManager'
import { Intersection, Material, Raycaster, Scene, Vector2 } from 'three'
import Sidebar from '@/components/Viewer/Sidebar.vue'
import { SidebarAction } from '../store/Models'
import PostgresModal from './Viewer/PostgresModal.vue'
import ContextMenu from '@/components/Viewer/ContextMenu.vue'
import * as THREE from 'three'
import { IFCModel } from 'web-ifc-three/IFC/components/IFCModel'
import { MeshLambertMaterial } from 'three'
import { IFCLoader } from 'web-ifc-three/IFCLoader'

@Component({
  components: { Sidebar, PostgresModal, ContextMenu }
})
export default class Viewer extends Vue {
  private raycaster!: Raycaster
  private mouse!: { x: number; y: number }
  private bounds!: DOMRect
  private x1: number = 0
  private x2: number = 0
  private y1: number = 0
  private y2: number = 0
  private IFCManager!: any
  private found!: Intersection
  private geometry: any
  private id: number = 0
  private threeCanvas!: HTMLCanvasElement
  private showPostgresModal: boolean = false
  private unActivePostgres: boolean = false
  private showContextMenu: boolean = false
  private hideContextMenu: boolean = false
  private yPosition: number = 0
  private xPosition: number = 0

  mounted() {
    this.IFCManager = new IfcManager('viewer')
    this.threeCanvas = document.getElementById('viewer') as HTMLCanvasElement
  }

  private showUploadPrompt() {
    ;(this.$refs.input as HTMLInputElement).click()
  }

  private fileChanged(e: Event): File | null {
    const target = e.target as HTMLInputElement

    if (target.files) {
      this.renderUploadedFile(target.files[0] as File)
    }

    return null
  }

  private async renderUploadedFile(file: File) {
    try {
      const ifcURL = URL.createObjectURL(file)

      this.IFCManager.scene.ifcModel =
        await this.IFCManager.ifcLoader.loadAsync(ifcURL)

      this.IFCManager.scene.add(this.IFCManager.scene.ifcModel.mesh)

      this.addPicking()
      this.$toasted.success('File loaded successfully')
    } catch (error) {
      this.$toasted.error('error')
    }
  }

  private handleActiveAction(action: SidebarAction) {
    switch (action.title) {
      case 'Upload':
        this.showUploadPrompt()
        break
      case 'Pathtracer':
        console.log('Convert to Gltf')
        break
      case 'Postgres':
        this.showPostgresModal = action.active
        break
    }
  }

  private contextMenu(event: MouseEvent) {
    this.yPosition = event.y
    this.xPosition = event.x
    this.showContextMenu = true
  }

  private checkAction(action: string) {
    switch (action) {
      case 'Isolate':
        this.isolate()
        break
      case 'Hide':
        this.hide()
        break
      case 'Wireframe':
        this.wireFrame()
        break
    }
  }

  private isolate() {
    console.log(this.found.object.getObjectById)
  }

  private async hide() {
    const item = await this.IFCManager.ifcLoader.ifcManager.getItemProperties(
      // @ts-ignore
      this.found.object.modelID,
      this.id
    )

    console.log(this.id, 'hide')
  }

  private wireFrame() {
    this.found.object.visible = false

    const { scene } = this.IFCManager

    const uuid = '' // nos llega en params

    // @ts-ignore
    const model = scene.scene.children.find(child => child.uuid === uuid)

    const material = new THREE.LineBasicMaterial({ color: 0xfff55f })

    // line
    const line = new THREE.Line(this.geometry, material)
    this.IFCManager.scene.add(line)
  }

  private unActiveModal() {
    this.showPostgresModal = false
    this.unActivePostgres = true

    setTimeout(() => {
      this.unActivePostgres = false
    }, 150)
  }

  private addPicking() {
    this.raycaster = new Raycaster()
    this.raycaster.firstHitOnly = true
    this.mouse = new Vector2()
  }

  private cast(event: MouseEvent) {
    this.bounds = this.threeCanvas.getBoundingClientRect()

    this.x1 = event.clientX - this.bounds.left
    this.x2 = this.bounds.right - this.bounds.left
    this.mouse.x = (this.x1 / this.x2) * 2 - 1

    this.y1 = event.clientY - this.bounds.top
    this.y2 = this.bounds.bottom - this.bounds.top
    this.mouse.y = -(this.y1 / this.y2) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.IFCManager.scene.camera)

    return this.raycaster.intersectObjects(this.IFCManager.scene.ifcModels)
  }

  private async pick(event: MouseEvent) {
    this.found = this.cast(event)[0]

    if (this.found && this.found.faceIndex) {
      // @ts-ignore
      this.geometry = this.found.object.geometry

      this.id = this.IFCManager.scene.ifcModel.getExpressId(
        this.geometry,
        this.found.faceIndex
      )

      const props =
        await this.IFCManager.ifcLoader.ifcManager.getItemProperties(
          // @ts-ignore
          this.found.object.modelID,
          this.id
        )
    }
  }
}
</script>
