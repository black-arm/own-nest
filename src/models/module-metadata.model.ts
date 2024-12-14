
export interface ModuleMetadata {
    controller: any[];
    service: any[];
}

/**
 * Interface representing a factory for module metadata.
 * 
 * @interface ModuleMetadataFactory
 * 
 * @property {Map<Function, Object>} controllers - A map of controller functions to their instances.
 * @property {Map<Function, Object>} services - A map of service functions to their instances.
 */
export interface ModuleMetadataFactory {
    controllers: Map<Function, Object>;
    services: Map<Function, Object>;
}