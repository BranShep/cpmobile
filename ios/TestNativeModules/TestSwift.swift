//
//  TestSwift.swift
//  TestNativeModules
//
//  Created by Brandon Shepherd on 10/16/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import UIKit

let bridgeHelperInstance = PublicBridgeHelper();

@objc(TestSwift)

public class TestSwift: NSObject {
  @objc(sendEventToJS:)
  func sendEventToJS(devicePluggedString: String) {
    let jsBridge = bridgeHelperInstance.getBridge()
    
    print("jsBridge = \(String(describing: jsBridge))")
    
    jsBridge?.eventDispatcher().sendAppEvent(withName: "test", body: devicePluggedString)
    
  }
  
  @objc(cardSwipped:::)
  func cardSwipped(person: String, cardNumber: String, expirationDate: String) {
    let jsBridge = bridgeHelperInstance.getBridge()
    
    print("jsBridge = \(String(describing: jsBridge))")
    
    var cardInfo = [
      person,
      cardNumber,
      expirationDate
    ]
    
    jsBridge?.eventDispatcher().sendAppEvent(withName: "cardSwipped", body: cardInfo)
  }
  
  @objc(onCardSwipeDetected)
  func onCardSwipeDetected() {
    let jsBridge = bridgeHelperInstance.getBridge()
    
    print("jsBridge = \(String(describing: jsBridge))")
    
    jsBridge?.eventDispatcher().sendAppEvent(withName: "cardSwipeDetected", body: "cardSwipeDetected")
  }
  
  @objc(onTimeout)
  func onTimeout() {
    let jsBridge = bridgeHelperInstance.getBridge()
    
    print("jsBridge = \(String(describing: jsBridge))")
    
    jsBridge?.eventDispatcher().sendAppEvent(withName: "timedOut", body: "#165831")
    
  }
  
}
