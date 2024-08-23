//
//  LiveActivityView.swift
//  distimer
//
//  Created by noViceMin on 8/23/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct ContentView: View {
  var startedAt: Int
  var subject: String
  var color: String
  var content: String
  
  var body: some View {
    VStack(alignment: .leading, spacing: 20) {
      HStack(spacing: 12) {
        VStack(alignment: .leading, spacing: 4) {
          Text("현재 공부 시간")
            .font(.custom("WantedSans-Medium", size: 13))
            .foregroundStyle(Color("Gray400"))
          Text(
            Date(
              timeIntervalSinceNow: Double(startedAt) - Date().timeIntervalSince1970
            ),
            style: .timer
          )
          .font(.custom("WantedSans-Bold", size: 28))
          .foregroundStyle(Color("Gray1000"))
        }
        .padding(.vertical, 4)
        Spacer()
        VStack {
          Image("Pause")
            .renderingMode(.template)
            .foregroundColor(Color("Gray0"))
        }
        .padding(12)
        .background(Color("Gray1000"))
        .cornerRadius(100)
        VStack {
          Image("Stop")
            .renderingMode(.template)
            .foregroundColor(Color("Gray0"))
        }
        .padding(12)
        .background(Color("Gray1000"))
        .cornerRadius(100)
      }
      .padding(.leading, 4)
      HStack(spacing: 8) {
        Image("GraduationCap")
          .renderingMode(.template)
          .foregroundColor(Color(hexString: color))
        Text(subject)
          .font(.custom("WantedSans-SemiBold", size: 13))
          .foregroundStyle(Color("Gray700"))
        Text(content)
          .font(.custom("WantedSans-Medium", size: 13))
          .foregroundStyle(Color("Gray400"))
      }
      .padding(4)
    }
    .padding(16)
  }
}

extension Color {
  init(hexString: String, alpha: Double = 1) {
    let hex: Int = Int(hexString, radix: 16)!
    self.init(
      .sRGB,
      red: Double((hex >> 16) & 0xff) / 255,
      green: Double((hex >> 08) & 0xff) / 255,
      blue: Double((hex >> 00) & 0xff) / 255,
      opacity: alpha
    )
  }
}
