import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonChip,
  IonIcon,
  IonLabel,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
} from "@ionic/react";
import { close, add } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
// import ExploreContainer from '../components/ExploreContainer';
import "./Page.css";

const options = [
  "Vegan",
  "Dairy",
  "Halal",
  "Meat",
  "Eco",
  "Bio",
  "Bacon",
  "Mayonnaise",
];

const Page: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );
  const [search, setSearch] = useState<string | null | undefined>();
  const { name } = useParams<{ name: string }>();

  const filteredOptions = options.filter(
    (option) => !search || option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ "--background": "#0C6DFD" }}>
          <IonTitle>
            <p>FOOD CHOICE</p>
          </IonTitle>
          <IonButtons slot="end">
            <IonMenuButton style={{ "--color": "#000000" }} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-padding">
              <p>
                Choose food items you want to show on the page of your store
              </p>
              {Array.from(selectedOptions).map((selectedOption) => (
                <IonChip
                  className="custom-chip"
                  onClick={() => {
                    let selectedOptionList = Array.from(selectedOptions);
                    let filteredlist = selectedOptionList.filter(
                      (item) =>
                        !selectedOption ||
                        !item
                          .toLowerCase()
                          .includes(selectedOption.toLowerCase())
                    );
                    setSelectedOptions(new Set([...Array.from(filteredlist)])); //convert to a list and convert back
                  }}
                >
                  <IonLabel>{selectedOption}</IonLabel>
                  <IonIcon icon={close}></IonIcon>
                </IonChip>
              ))}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-padding">
              <IonSearchbar
                placeholder="Search"
                onIonChange={(evt) => setSearch(evt.target.value)}
                style={{ "--background": "#ffffff", "--color": "black" }}
              ></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol
              className="ion-padding"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {filteredOptions.map((option) => (
                <IonButton
                  expand="block"
                  style={{ textAlign: "left", "--background": "#0C6DFD" }}
                  onClick={() => {
                    setSelectedOptions(
                      (prevState) => new Set([...Array.from(prevState), option])
                    );
                  }}
                >
                  <IonText style={{ flexGrow: 1 }}>{option}</IonText>
                  <IonIcon slot="end" icon={add} />
                </IonButton>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* <ExploreContainer name={name} /> */}
      </IonContent>
    </IonPage>
  );
};

export default Page;
