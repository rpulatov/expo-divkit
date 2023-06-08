import ExpoModulesCore
import DivKit
import LayoutKit
import CommonCore

struct State {
    let block: Block
    let view: BlockView
}

final class ExpoDivKitView: ExpoView {
    private var cardData: DivData?
    private var components: DivKitComponents!
    private var customViewCollection: [String: RCTView] = [:]
    private var state: State?
    let onHeightChanged = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        
        components = DivKitComponents(
            divCustomBlockFactory: CustomViewFactory(requester: self),
            updateCardAction: nil,
            urlOpener: { UIApplication.shared.open($0) }
        )
        
    }
    
    
    private func updateStateByData(_ data: DivData, cachedImageHolders: [ImageHolder] = []) {
        
        let context = components.makeContext(
            cardId: DivCardID(rawValue: data.logId),
            cachedImageHolders: cachedImageHolders
        )
        
        let block = try! data.makeBlock(context: context)
        
        let view = block.reuse(
            state?.view,
            observer: nil,
            overscrollDelegate: nil,
            renderingDelegate: nil,
            superview: self
        )
        state = State(block: block, view: view)
        
        resizeView()
    }
    
    private func resizeView() {
        if (bounds.size.width <= 0) {
            return
        }
        if let state = state {
            // TODO: #104871 проверить чтобы кастом виджеты рендерились на половину ширины контейнера
            let blockSize = state.block.size(forResizableBlockSize: bounds.size)
            state.view.frame = CGRect(origin: .zero, size: blockSize)
            
            onHeightChanged(["height": blockSize.height])
        }
    }
    
    public func updateView(jsonData: [String: Any]) {
        if let card = try? DivJson.loadCard(jsonData: jsonData) {
            cardData = card
            reloadCard()
        }
    }
    
    public func getCustomViewById(customViewId: String) -> RCTView? {
        customViewCollection[customViewId]
    }
    
    public func onCustomViewRendered() {
        reloadCard()
    }
    
    private func reloadCard() {
        if let card = cardData {
            updateStateByData(card, cachedImageHolders: state?.block.getImageHolders() ?? [])
        }
    }
    
    override var bounds: CGRect {
        didSet {
            if oldValue.width != bounds.width {
                resizeView()
            }
        }
    }
    
    
    override func didAddSubview(_ subview: UIView) {
        // if view from React
        if (subview is RCTView) {
            subview.removeFromSuperview()
            customViewCollection[subview.nativeID] = subview as? RCTView
        }
    }
    
    override var intrinsicContentSize: CGSize {
        return UIView.layoutFittingExpandedSize
    }
}

extension ExpoDivKitView: UIActionEventPerforming {
    func perform(uiActionEvent event: UIActionEvent, from _: AnyObject) {
        switch event.payload {
        case let .divAction(params):
            components.handleActions(params: params)
            reloadCard()
        case .empty,
                .url,
                .menu,
                .json,
                .composite:
            break
        }
    }
}
