import Foundation

import DivKit
import LayoutKit
import CommonCore


public final class CustomBlock: BlockWithTraits {
    public var widthTrait: LayoutTrait
    public var heightTrait: LayoutTrait
    private let view: UIView?
    
    public init(
        view: UIView?,
        widthTrait: LayoutTrait = .resizable,
        heightTrait: LayoutTrait = .resizable
    ) {
        self.widthTrait = widthTrait
        self.heightTrait = heightTrait
        self.view = view
    }
    
    public var intrinsicContentWidth: CGFloat {
        widthTrait.intrinsicSize
    }
      
    public func intrinsicContentHeight(forWidth _: CGFloat) -> CGFloat {
        heightTrait.intrinsicSize
    }
    
    
    public static func makeBlockView() -> BlockView {
        CustomView()
    }
    
    public func canConfigureBlockView(_ view: BlockView) -> Bool {
        view is CustomView
    }
    
    public func configureBlockView(
        _ view: BlockView,
        observer: ElementStateObserver?,
        overscrollDelegate: ScrollDelegate?,
        renderingDelegate: RenderingDelegate?
    ) {
        let customView = view as! CustomView
        customView.setParentBlock(self)
        if let subview = self.view {
            self.heightTrait = LayoutTrait.fixed(subview.frame.size.height)
            customView.addSubview(subview)    
        }
    }
    
    public var debugDescription: String {
        return "CustomBlock debugDescription"
    }
    
    public func getImageHolders() -> [ImageHolder] { [] }
    
    public func equals(_ other: Block) -> Bool {
        guard let other = other as? CustomBlock else {
            return false
        }
        
        return self == other
    }
}

public func ==(lhs: CustomBlock, rhs: CustomBlock) -> Bool {
    lhs.widthTrait == rhs.widthTrait && lhs.heightTrait == rhs.heightTrait
}

extension CustomBlock: LayoutCachingDefaultImpl {}
extension CustomBlock: ElementStateUpdatingDefaultImpl {}

extension LayoutTrait {
    fileprivate var intrinsicSize: CGFloat {
        switch self {
        case let .fixed(value):
            return value
        case let .intrinsic(_, minSize, _):
            return minSize
        case .weighted:
            return 0
        }
    }
}
