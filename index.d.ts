/// <reference types="node" />

declare module Instascan {
  interface ScannerOptions {
    continuous?: boolean
    video?: HTMLVideoElement
    mirror?: boolean
    captureImage?: boolean
    backgroundScan?: boolean
    refractoryPeriod?: boolean
    scanPeriod?: boolean
  }

  export interface Camera {
    id: string
    name: string | null
  }

  namespace Camera {
    export function getCameras(): Promise<Camera[]>
  }

  interface ScanResult {
    content: string
    image: string | null
  }

  type ScanResultCallback = (content: string, image: string | null) => any
  type VoidCallback = () => any

  export class Scanner {
    constructor(opts: ScannerOptions)
    
    start(camera: Camera): Promise<void>
    stop(): Promise<void>
    scan(): ScanResult | null

    addListener(event: 'scan', callback: ScanResultCallback): void
    addListener(event: 'active' | 'inactive', callback: VoidCallback): void
  }
}

export = Instascan
