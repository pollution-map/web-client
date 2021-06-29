import { ViewStateProps } from '@deck.gl/core/lib/deck';
import center from 'src/data/izhevsk-center.json';

interface InteractionState {
  inTransition?: boolean;
  isDragging?: boolean;
  isPanning?: boolean;
  isRotating?: boolean;
  isZooming?: boolean;
}

export class MapStore {
  isBaseMapInitialized: boolean = false;
  setBaseMapInitialized = () => (this.isBaseMapInitialized = true);

  is3D: boolean = false;
  toggleIs3D = () => (this.is3D = !this.is3D);

  viewState: ViewStateProps = {
    longitude: center[1],
    latitude: center[0],
    zoom: 12,
    pitch: 35,
    bearing: -2,
  };

  updateViewState = (viewState: ViewStateProps) => {
    this.viewState = {
      ...this.viewState,
      ...viewState,
    };
  };

  changeViewState = (
    reducer: (prevViewState: ViewStateProps) => ViewStateProps
  ) => {
    this.updateViewState(reducer(this.viewState));
  };

  get isZoomedNear(): boolean {
    const { zoom } = this.viewState;
    return zoom !== undefined && zoom > 12;
  }
}
