import ExpoModulesCore
import DivKit
import LayoutKit

final class ExpoDivKitView: ExpoView {
  private var divHostView: DivHostView!
  private var components: DivKitComponents!
  let onRenderCustomViewRequested = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true

    components = DivKitComponents(
        divCustomBlockFactory: CustomViewFactory(requester: self),
        updateCardAction: nil,
        urlOpener: { UIApplication.shared.open($0) }
    )
    divHostView = DivHostView(components: components)
    
    addSubview(divHostView)
  }

  public func updateView(jsonData: [String: Any]) {
    if let cards = try? DivJson.loadCards(jsonData: jsonData) {
      divHostView.setData(cards)
    }
  }
    
  public func sendRequestToRenderCustomView(customViewId: String, customType: String) {
      onRenderCustomViewRequested()
  }

  override func layoutSubviews() {
    divHostView.frame = bounds.inset(by: safeAreaInsets)
  }
    
    override func didAddSubview(_ subview: UIView) {
      //  var tag = subview.tag
    }
}

 extension ExpoDivKitView: UIActionEventPerforming {
   func perform(uiActionEvent event: UIActionEvent, from _: AnyObject) {
     switch event.payload {
     case let .divAction(params):
       components.handleActions(params: params)
       divHostView.reloadItem(cardId: params.cardId)
     case .empty,
          .url,
          .menu,
          .json,
          .composite:
       break
     }
   }
 }

