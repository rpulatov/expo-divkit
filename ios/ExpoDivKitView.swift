import ExpoModulesCore
import DivKit

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
final class ExpoDivKitView: ExpoView {
  private var divHostView: DivHostView!
  private var components: DivKitComponents!

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true

    components = DivKitComponents(
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

  override func layoutSubviews() {
    divHostView.frame = bounds.inset(by: safeAreaInsets)
  }
}

// extension ExpoDivKitView: UIActionEventPerforming {
//   func perform(uiActionEvent event: UIActionEvent, from _: AnyObject) {
//     switch event.payload {
//     case let .divAction(params):
//       components.handleActions(params: params)
//       divHostView.reloadItem(cardId: params.cardId)
//     case .empty,
//          .url,
//          .menu,
//          .json,
//          .composite:
//       break
//     }
//   }
// }

