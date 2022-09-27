import * as THREE from 'three';
import {IconPackage, IconMesh} from '../meshes/icon-mesh.js';
import {urlSpecs} from '../assets.js';

//

export const hudUrls = urlSpecs.huds;

//

const hudLodDistanceCutoff = 4;

//

export class HudMesh extends THREE.Object3D {
  constructor({
    instance,
    // gpuTaskManager,
  }) {
    super();

    this.iconMesh = new IconMesh({
      instance,
      lodCutoff: hudLodDistanceCutoff,
    });
    this.add(this.iconMesh);
  }
  addChunk(chunk, chunkResult) {
    this.iconMesh.addChunk(chunk, chunkResult);
  }
  removeChunk(chunk) {
    this.iconMesh.removeChunk(chunk);
  }
  async waitForLoad() {
    const iconPackage = await IconPackage.loadUrls(hudUrls);
    this.iconMesh.setPackage(iconPackage);
  }
}