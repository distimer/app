//
//  LiveActivityAttributes.swift
//  distimer
//
//  Created by noViceMin on 8/23/24.
//

import Foundation
import ActivityKit
import OneSignalLiveActivities

struct LiveActivityAttributes: OneSignalLiveActivityAttributes {
  public struct ContentState: OneSignalLiveActivityContentState {
    var startedAt: Int
    var subject: String
    var color: String
    var content: String
  
    var onesignal: OneSignalLiveActivityContentStateData?
  }

  var onesignal: OneSignalLiveActivityAttributeData
}
