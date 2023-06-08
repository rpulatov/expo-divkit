import Foundation

import DivKit
import Serialization
import TemplatesSupport

public struct DivJson: Deserializable {
  public let templates: [String: Any]
  public let cards: [[String: Any]]

  public init(dictionary: [String: Any]) throws {
    templates = try dictionary.getOptionalField("templates") ?? [:]
    cards = try dictionary.getArray("cards")
  }

  static func loadCards(jsonData: [String: Any]) throws -> [DivData] {
    let divJson = try DivJson(dictionary: jsonData)
    return divJson.cards.compactMap {
      DivData.resolve(
        card: $0,
        templates: divJson.templates
      ).value
    }
  }
}