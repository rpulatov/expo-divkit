import Foundation

import DivKit
import Serialization
import TemplatesSupport

extension String: Error {}

public struct DivJson: Deserializable {
  public let templates: [String: Any]
  public let card: [String: Any]

  public init(dictionary: [String: Any]) throws {
    templates = try dictionary.getOptionalField("templates") ?? [:]
    card = try dictionary.getOptionalField("card") ?? [:]
  }

  static func loadCards(jsonData: [String: Any]) throws -> [DivData] {
    let divJson = try DivJson(dictionary: jsonData)
      
    let divData = DivData.resolve(
        card: divJson.card,
        templates: divJson.templates
    ).value
      
    if (divData == nil) { throw "Not resolved card"}
        
    return [divData!]
  }
}
