import ExpoModulesCore

public class ExpoDivKitModule: Module {

  public func definition() -> ModuleDefinition {
    Name("ExpoDivKit")

    View(ExpoDivKitView.self) {
      Events("onRenderCustomViewRequested")
        
      Prop("json") { (view: ExpoDivKitView, json: [String: Any]) in        
        view.updateView(jsonData:json)
      }
         
    }
  }
}
