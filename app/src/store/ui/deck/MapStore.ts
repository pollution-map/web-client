export class MapStore {
  isBaseMapInitialized: boolean = false;
  setBaseMapInitialized = () => (this.isBaseMapInitialized = true);

  is3D: boolean = false;
  toggleIs3D = () => (this.is3D = !this.is3D);

  // one way binded? just a copy of view state, i.e. changing this won't affect view
  isZoomedFar: boolean = false;

  updateZoom = (newZoom: number) => {
    this.isZoomedFar = newZoom > 12;
  };
}
