//
//  ReaderDeploymentViewController.h
//  HelloWorld
//
//  Created by John Fu on 09年12月16日.
//  Copyright 2009 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ReaderController.h"

@interface ViewController : UIViewController <UITextFieldDelegate, ReaderControllerDelegate> {
  UITextView *textView;
@private
  ReaderController *controller;
  
  IBOutlet UILabel *lblStatus;
  IBOutlet UILabel *lblFormatID;
  IBOutlet UILabel *lblMaskedPAN;
  IBOutlet UILabel *lblExpiryDate;
  IBOutlet UILabel *lblKsn;
  IBOutlet UILabel *lblCardHolder;
  IBOutlet UILabel *lblTrace1Length;
  IBOutlet UILabel *lblTrace2Length;
  IBOutlet UILabel *lblTrace3Length;
  IBOutlet UILabel *lblServiceCode;
  
  IBOutlet UILabel *desclblFormatID;
  IBOutlet UILabel *desclblMaskedPAN;
  IBOutlet UILabel *desclblExpiryDate;
  IBOutlet UILabel *desclblKsn;
  IBOutlet UILabel *desclblCardHolder;
  IBOutlet UILabel *desclblTrace1Length;
  IBOutlet UILabel *desclblTrace2Length;
  IBOutlet UILabel *desclblTrace3Length;
  IBOutlet UILabel *desclblServiceCode;
}

@property (nonatomic, retain) IBOutlet UITextView *textView;
@property (nonatomic, retain) ReaderController *controller;

@property (retain, nonatomic) IBOutlet UILabel *desclblFormatID;
@property (retain, nonatomic) IBOutlet UILabel *desclblMaskedPAN;
@property (retain, nonatomic) IBOutlet UILabel *desclblExpiryDate;
@property (retain, nonatomic) IBOutlet UILabel *desclblKsn;
@property (retain, nonatomic) IBOutlet UILabel *desclblCardHolder;
@property (retain, nonatomic) IBOutlet UILabel *desclblTrace1Length;
@property (retain, nonatomic) IBOutlet UILabel *desclblTrace2Length;
@property (retain, nonatomic) IBOutlet UILabel *desclblTrace3Length;
@property (retain, nonatomic) IBOutlet UILabel *desclblEncTrack1And2;
@property (retain, nonatomic) IBOutlet UILabel *desclblServiceCode;

@property (retain, nonatomic) IBOutlet UILabel *lblStatus;
@property (retain, nonatomic) IBOutlet UILabel *lblFormatID;
@property (retain, nonatomic) IBOutlet UILabel *lblMaskedPAN;
@property (retain, nonatomic) IBOutlet UILabel *lblExpiryDate;
@property (retain, nonatomic) IBOutlet UILabel *lblKsn;
@property (retain, nonatomic) IBOutlet UILabel *lblCardHolder;
@property (retain, nonatomic) IBOutlet UILabel *lblTrace1Length;
@property (retain, nonatomic) IBOutlet UILabel *lblTrace2Length;
@property (retain, nonatomic) IBOutlet UILabel *lblTrace3Length;
@property (retain, nonatomic) IBOutlet UILabel *lblEncTrack1And2;
@property (retain, nonatomic) IBOutlet UILabel *lblServiceCode;

- (IBAction)start:(id)sender;
- (IBAction)stop:(id)sender;
- (IBAction)detect:(id)sender;
- (IBAction)getKsn:(id)sender;
- (void) clearCardDataLabel;

@end
