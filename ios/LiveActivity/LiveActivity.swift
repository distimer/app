//
//  LiveActivityLiveActivity.swift
//  LiveActivity
//
//  Created by noViceMin on 8/23/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct LiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LiveActivityAttributes.self) { context in
            ContentView(
                startedAt: context.state.startedAt,
                subject: context.state.subject,
                color: context.state.color,
                content: context.state.content
            )
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                }
                DynamicIslandExpandedRegion(.trailing) {
                }
                DynamicIslandExpandedRegion(.bottom) {
                }
            } compactLeading: {
            } compactTrailing: {
            } minimal: {
            }
        }
    }
}

extension LiveActivityAttributes.ContentState {
    fileprivate static var test: LiveActivityAttributes.ContentState {
        LiveActivityAttributes.ContentState(
            startedAt: 1724394217,
            subject: "미적분",
            color: "ff0000",
            content: "내용입니다"
        )
    }
}

#Preview("Notification", as: .content, using: LiveActivityAttributes()) {
    LiveActivity()
} contentStates: {
    LiveActivityAttributes.ContentState.test
}
