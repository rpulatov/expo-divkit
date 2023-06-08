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
      
      let uniqueTag = UUID().uuidString
      let tag = Int(uniqueTag) ?? 0
      let block = CustomBlock(
        tag: tag,
        widthTrait: data.widthTrait,
        heightTrait: data.heightTrait
      )

      self.requester.sendRequestToRenderCustomView(customViewId: String(tag), customType: data.name)
      
      return block
    
  }
}
