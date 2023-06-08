import ExpoModulesCore

public class ExpoDivKitModule: Module {
    
    public func definition() -> ModuleDefinition {
        Name("ExpoDivKit")
        
        Function("onCustomViewRendered") { (_ node: Int) in
            DispatchQueue.main.async {
                let component = ( self.appContext?.reactBridge?.uiManager.view(forReactTag: NSNumber(value: node))
                ) as! ExpoDivKitView
                component.onCustomViewRendered()
            }
        }
        
        
        View(ExpoDivKitView.self) {
            Events("onHeightChanged")
            
            Prop("json") { (view: ExpoDivKitView, json: [String: Any]) in
                view.updateView(jsonData:json)
            }
            
        }
    }
}
