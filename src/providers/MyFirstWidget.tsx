import { useActiveViewport } from "@itwin/appui-react";
import React, { useEffect } from "react";
import RealityDataApi from "./RealityDataApi";
import "./MyFirstWidget.css";
import { Button, ToggleSwitch } from "@itwin/itwinui-react";
import { ColorDef, ContextRealityModelProps } from "@itwin/core-common";
import { ColorPickerButton } from "@itwin/imodel-components-react";

export const MyFirstWidget: React.FC = () => {
  const viewport = useActiveViewport();

  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [realityModels, setRealityModelList] = React.useState<ContextRealityModelProps[]>([]);
  const [ListOfThings, setListOfThings] = React.useState<string[]>([]);
  const [classifier, setClassifier] = React.useState<string>("");
  const [hiliteColor, setHiliteColor] = React.useState<ColorDef>(ColorDef.green);

  useEffect(() => {
    const asyncInitialize = async () => {
      if (viewport) {
        const realityModels = await RealityDataApi.getRealityModels(viewport.iModel);
        setRealityModelList(realityModels);
        const classifiers = await RealityDataApi.getAvailableClassifierListForViewport(viewport);
        if(classifiers) {
          setClassifier(classifiers[0].value);
        }
        setHiliteColor(viewport.hilite.color);
      }
    };

    if (!initialized) {
      void asyncInitialize().then (() => { setInitialized(true);})
    }
  });

  const togglePhillyReality = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if (viewport) {
      for (const model of realityModels) {
        if (model.name === "Philadelphia_2015") {
          RealityDataApi.toggleRealityModel(model, viewport, e.target.checked);
          RealityDataApi.setRealityDataClassifier(viewport, classifier);
        }
      }
    }
  }
  const onColorChange = async (newColor: ColorDef) => {
    // Code goes here
    if (viewport) {
      viewport.hilite = {...viewport.hilite, color: newColor};
      setHiliteColor(viewport.hilite.color);
    }
  }

  const buttonClicked = async () => {alert("No-no, don't touch me there, this my no-no square")  
  setListOfThings([...ListOfThings, "NARUTO!!! SASUKE!!!"]) 
 
} 
const thingList = ListOfThings.map((thing: string) => <li>{thing}</li>);
  return (
    <div>
      This is my first widget
      <ToggleSwitch onChange={togglePhillyReality} label='Philly Reality Data' />
      <ColorPickerButton initialColor={hiliteColor} onColorPick={onColorChange} />
      <p/>
      <Button onClick={buttonClicked}>Button Activation</Button>
      
      <ul>
        {thingList} 
      </ul>
    </div>
  );
};



