import Foundation


import DivKit
import LayoutKit
import Base


public final class CustomBlock: BlockWithTraits {
  public let widthTrait: LayoutTrait
  public let heightTrait: LayoutTrait
  private let tag: Int

  public init(
    tag: Int,
    widthTrait: LayoutTrait = .resizable,
    heightTrait: LayoutTrait = .resizable
  ) {
    self.widthTrait = widthTrait
    self.heightTrait = heightTrait
    self.tag = tag
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
        customView.setTag(tag: self.tag)
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
