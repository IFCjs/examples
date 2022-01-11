<template>
  <section>
    <canvas id="viewer" @dblclick="pick" class="viewer-wrapper" />
    <Sidebar
      :unactive-postgres="unActivePostgres"
      @handle-active="handleActiveAction"
    />
    <PostgresModal v-if="showPostgresModal" @hide-modal="unActiveModal" />
    <input
      type="file"
      ref="input"
      style="display: none"
      @change="fileChanged"
      accept="*.ifc"
    />
    <p class="viewer-properties-text" v-text="`ID: ${entityData}`" />
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import IfcManager from '@/controllers/IFC/IfcManager'
import { Intersection, Raycaster, Vector2 } from 'three'
import Sidebar from '@/components/Viewer/Sidebar.vue'
import { SidebarAction } from '../store/Models'
import PostgresModal from './Viewer/PostgresModal.vue'

@Component({
  components: { Sidebar, PostgresModal }
})
export default class Viewer extends Vue {
  private entityData: string = ''
  private raycaster!: Raycaster
  private mouse!: { x: number; y: number }
  private bounds!: DOMRect
  private x1!: number
  private x2!: number
  private y1!: number
  private y2!: number
  private IFCManager!: any
  private found!: Intersection
  private geometry: any
  private id: string = ''
  private threeCanvas!: HTMLCanvasElement
  private showPostgresModal: boolean = false
  private unActivePostgres: boolean = false

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
      case 'Postgres':
        this.showPostgresModal = action.active
        break
    }
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

  private pick(event: MouseEvent) {
    this.found = this.cast(event)[0]

    if (this.found && this.found.faceIndex) {
      // @ts-ignore
      this.geometry = this.found.object.geometry

      this.id = this.IFCManager.scene.ifcModel.getExpressId(
        this.geometry,
        this.found.faceIndex
      )

      this.entityData = this.id
    }
  }
}
</script>
