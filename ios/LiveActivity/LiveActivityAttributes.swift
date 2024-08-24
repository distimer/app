//
//  LiveActivityAttributes.swift
//  distimer
//
//  Created by noViceMin on 8/23/24.
//

import Foundation
import ActivityKit

struct LiveActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var startedAt: Int
        var subject: String
        var color: String
        var content: String
    }
}
