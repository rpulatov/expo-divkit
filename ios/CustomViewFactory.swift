import Foundation


import DivKit
import LayoutKit


struct CustomViewFactory: DivCustomBlockFactory {
    private let requester: ExpoDivKitView
    
    init(requester: ExpoDivKitView) {
        self.requester = requester
    }
    
    public func makeBlock(
        data: DivCustomData,
        context: DivBlockModelingContext
    ) -> Block {
        
        if let nativeViewId = data.data["nativeViewId"] as? String {
            if let customView = requester.getCustomViewById(customViewId: nativeViewId) {
                return CustomBlock(
                    view: customView,
                    widthTrait: data.widthTrait,
                    heightTrait: data.heightTrait
                )
            }
            
        }
                
        return EmptyBlock(
            widthTrait: data.widthTrait,
            heightTrait: data.heightTrait
        )
        
    }
}
