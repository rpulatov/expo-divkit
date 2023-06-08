import Foundation
import DivKit
import LayoutKit

final class CustomView: BlockView {
    var parentBlock: CustomBlock?
    
    func onVisibleBoundsChanged(from: CGRect, to: CGRect) {}
    
    let effectiveBackgroundColor: UIColor? = nil
    
    override func layoutSubviews() {
        super.layoutSubviews()
        if let subview = super.subviews.first {
            parentBlock?.heightTrait = LayoutTrait.fixed(subview.frame.size.height)
        }
    }
    
    func setParentBlock(_ parentBlock: CustomBlock) {
        self.parentBlock = parentBlock
    }
}

