import Foundation
import DivKit
import LayoutKit

final class CustomView: BlockView {
    func onVisibleBoundsChanged(from: CGRect, to: CGRect) {
        
    }
    
    var effectiveBackgroundColor: UIColor?
        
    
    public func setTag(tag: Int) {
        self.tag = tag
    }
}
