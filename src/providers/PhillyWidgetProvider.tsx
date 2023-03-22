/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { CommonWidgetProps, StagePanelSection, StagePanelLocation, UiItemsProvider } from "@itwin/appui-react";
import { MyFirstWidget } from "./MyFirstWidget";

export class PhillyWidgetProvider implements UiItemsProvider {
  public readonly id = "PhillyWidget";

  public provideWidgets(
    stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    _section?: StagePanelSection | undefined
  ): ReadonlyArray<CommonWidgetProps> {
    const widgets: CommonWidgetProps[] = [];

    widgets.push({
      id: "phillyWidget",
      label: "Philly",
      getWidgetContent: () => (
        <div>
          <MyFirstWidget />
        </div>
      )
    });
    return widgets;
  }
}