/*

public class BikeSharingTFL : MonoBehaviour {

    public string bikesRequest = "https://api.tfl.gov.uk/BikePoint?app_id=571701b1&app_key=5e400a05f6f1c40ebfc5bbe5786044da";

    string bikeDockPrefab = "MobilityPrefab/BikeSharing/BikeSharingPole";

    string parentbikeDockPrefab = "MobilityPrefab/BikeSharing/parentBikeSharing";

//Center Location of the request
	float lonCentrepoint;
	float latCentrepoint;
	float extentBuffer;
	Vector3 offset;


    private List<AdditionalProperty> listaStation = new List<AdditionalProperty>();

    private int countStation;

    public Coroutine routineBike;
    public Coroutine routineBikeStop;


    public void Setup () {


        Scale = 1;

		//location of the QEOP
		lonCentrepoint = -0.0124774f;
		latCentrepoint = 51.5432665f;
		extentBuffer = 2000f;

		offset = CoordHelper.WGS84toWebMercator(new Vector3(lonCentrepoint, 0, latCentrepoint));

		bikeContainer = new GameObject();
		bikeContainer.name = "Bike Docks";
		bikeContainer.transform.parent = parent.transform;


       // routineBike = StartCoroutine(RequestBikeDocksStationCommand(parent));
        //        routineBikeStop = StartCoroutine(StopRequest());
        StartCoroutine(RequestBikeDocksStationCommand(parent));

    }

    //Requests Bikes Docks from API
    IEnumerator StopRequest()
    {
        StopAllCoroutines();
        yield break;
    }

    IEnumerator RequestBikeDocksStationCommand(GameObject parent)
    {
        int counter = 0;
        GameObject prefab = Resources.Load(bikeDockPrefab) as GameObject;
        GameObject prefabParent = Resources.Load(parentbikeDockPrefab) as GameObject;


        UnityWebRequest www = UnityWebRequest.Get(bikesRequest);
        yield return www.Send();

        string NoDollar = www.downloadHandler.text.Replace("$", "");

        //List<RootObject> RootObjList = (List<RootObject>)JsonConvert.DeserializeObject((NoDollar), typeof(List<RootObject>)); //using Newtonsoft. finalJson string not needed
        string finalJson = "{\"Rootobject\":" + NoDollar + "}";

        //Debug.Log(finalJson);

        Item RootObjListTemp = JsonUtility.FromJson<Item>(finalJson);

        foreach (var item in RootObjListTemp.Rootobject)
        {
            Vector3 coords = CoordHelper.WGS84toWebMercator(new Vector3((float)item.lon, 60f, (float)item.lat)) - offset;


            listaStation = item.additionalProperties;

            if (coords.x > (lonCentrepoint - extentBuffer) && coords.x < (lonCentrepoint + extentBuffer) && coords.z < (latCentrepoint + extentBuffer) && coords.z > (latCentrepoint - extentBuffer))
            {
                var factorHeight = 10;

                GameObject parentDock = Instantiate(prefabParent, new Vector3(coords.x, 0, coords.z), Quaternion.identity) as GameObject;
                parentDock.name = item.commonName;

                Debug.Log(item.id);

                GameObject dockStation = Instantiate(prefab, new Vector3(coords.x, factorHeight, coords.z), Quaternion.identity) as GameObject;

                dockStation.transform.localScale = new Vector3(5, 5, 5);

                //6 NbBikes
                //7 NbEmptyDocks
                //Debug.Log(listaStation[6].value);
                //Debug.Log(listaStation[7].value);

                //Slice Pie
                float sliceED = (float.Parse(listaStation[7].value) / ((float.Parse(listaStation[7].value)) + (float.Parse(listaStation[6].value))));
                float sliceFB = (float.Parse(listaStation[6].value) / ((float.Parse(listaStation[7].value)) + (float.Parse(listaStation[6].value))));



                GameObject UI_Bike = dockStation.transform.FindChild("UI_Chart_Bike").gameObject;

                // UI_Bike.transform.GetChild(0).GetChild(0).GetComponent<Text>().text = item.commonName;
                UI_Bike.transform.GetChild(0).GetChild(1).GetComponent<TextMeshProUGUI>().text = item.commonName;
                UI_Bike.transform.GetChild(1).GetComponent<Image>().fillAmount = sliceFB;
                UI_Bike.transform.GetChild(2).GetComponent<Image>().fillAmount = sliceED;

                UI_Bike.transform.GetChild(3).GetChild(0).GetComponent<Text>().text = listaStation[7].value;
                UI_Bike.transform.GetChild(4).GetChild(0).GetComponent<Text>().text = listaStation[6].value;
                parentDock.transform.parent = bikeContainer.transform;
                dockStation.transform.parent = parentDock.transform;

            }


        }
        bikeContainer.transform.localScale = new Vector3(Scale, Scale, Scale);
        bikeContainer.transform.localPosition = new Vector3(0, 0, 0);

        counter++;
        Debug.Log(counter.ToString() + " JSonObtained");

        yield return null;
    }
}
*/


AFRAME.registerComponent('bikedocks', {
  schema: {
    NAME:{type: 'string'},
    NBBIKES:{type: 'string'},
    NBDOCKS:{type: 'string'},
  }
});
var stationcont;

AFRAME.registerComponent('createbikesdocks', {

  init:function (){
  		console.log('Parse Bike Docks');

      let sceneEl = document.querySelector('a-scene');
      let bikedockscontainer=sceneEl.querySelector('#bikedockscontainer');
      //bikedockscontainer.object3D.rotation.set(0,0,0);

      var latWGS84cen = 51.509865;
      var lonWGS84cen = -0.118092;

      var sourcePrj = new proj4.defs('EPSG:4326');    //source coordinates will be in Longitude/Latitude 4326
      var destPrj = new proj4.defs('EPSG:3857');     //destination coordinates in WebMercator 3857

      var pcen4326 = new proj4.Point(lonWGS84cen,latWGS84cen);   //any object will do as long as it has 'x' and 'y' properties
      var pcen3857 = new proj4(sourcePrj, destPrj, pcen4326);


      var placeholder= new THREE.Geometry();
       stationcont = document.createElement('a-entity');

      var groupstations=new THREE.Group();

      $.getJSON('https://api.tfl.gov.uk/BikePoint?app_id=571701b1&app_key=5e400a05f6f1c40ebfc5bbe5786044da', function (jsonBikes) {
        console.log(jsonBikes[0]);

  var materialdockempty = new THREE.MeshStandardMaterial( {color: 'red', side: THREE.DoubleSide} );
  var materialbikefree = new THREE.MeshStandardMaterial( {color: 'green', side: THREE.DoubleSide} );
        jsonBikes.forEach(function (bikeDocks)
        {
          var point4326 = new proj4.Point(bikeDocks.lon,bikeDocks.lat);   //any object will do as long as it has 'x' and 'y' properties
          var point3857 = new proj4(sourcePrj, destPrj, point4326);

          var x = point3857.x-pcen3857.x;
          var y = 10;
          var z = point3857.y-pcen3857.y;


          var geometrybikefree = new THREE.BoxBufferGeometry( 30, 0, 30 );
          var geometrydockempty = new THREE.BoxBufferGeometry( 30, 0, 30 );

          var bikefreeMesh = new THREE.Mesh( geometrybikefree, materialbikefree );
          var dockemptyMesh = new THREE.Mesh( geometrydockempty, materialdockempty );


          bikefreeMesh.position.set(x+17,20,z);
          dockemptyMesh.position.set(x-17,20,z);

          //cone.rotation.set(THREE.Math.degToRad(180),0,0);
          bikefreeMesh.name=bikeDocks.id+"bikefree";
          dockemptyMesh.name=bikeDocks.id+"dockempty";

          //mergemeshes(cone,material);

          groupstations.add(bikefreeMesh);
          groupstations.add(dockemptyMesh);
        })



});


stationcont.setObject3D('mesh', groupstations);
bikedockscontainer.appendChild(stationcont);

console.log(stationcont.object3D.children);

//instead of merging the meshes is better to create group that keep the object separated
function mergemeshes(meshtomerge,material)
{

meshtomerge.updateMatrix();

placeholder.merge(meshtomerge.geometry,meshtomerge.matrix);

//var theline=new THREE.Mesh(placeholder, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
var thepole=new THREE.Mesh(placeholder, material);

console.log(stationcont);

stationcont.setObject3D('mesh', thepole);
bikedockscontainer.appendChild(stationcont);

}

}
})

var counter=0;
  var bikefree;
  var dockempty;

  var refT=Date.now();
AFRAME.registerComponent('rtbikes', {
  schema: {
    TIME:{type: 'int',default:15},

  },

tick:function(t,td)
{
  if(Date.now()/1000 - refT/1000>this.data.TIME){
  counter++;
  console.log(counter);
    refT=Date.now();
    this.data.event++;

    refT=Date.now();

    $.getJSON('https://api.tfl.gov.uk/BikePoint?app_id=571701b1&app_key=5e400a05f6f1c40ebfc5bbe5786044da', function (jsonBikes) {

      console.log("new data");

      jsonBikes.forEach(function (bikert)
      {
         bikefree=stationcont.object3D.getObjectByName(bikert.id+"bikefree");
         dockempty=stationcont.object3D.getObjectByName(bikert.id+"dockempty");

        bikefree.scale.set(1,bikert.additionalProperties[6].value*10,1);
        dockempty.scale.set(1,bikert.additionalProperties[7].value*10,1);

        bikefree.position.set(bikefree.position.x,bikert.additionalProperties[6].value*10/2,bikefree.position.z);
        dockempty.position.set(dockempty.position.x,bikert.additionalProperties[7].value*10/2,dockempty.position.z);

        //bikefree.position.set(bikefree.position.x,bikert.additionalProperties[6].value*10/2,bikefree.position.z);
        //dockempty.position.set(dockempty.position.x,bikert.additionalProperties[7].value*10/2,dockempty.position.z);

  /*
        stationcont.object3D.getObjectByName(bikert.id+"bikefree").scale.set(1,bikert.additionalProperties[6].value*10,1);
        stationcont.object3D.getObjectByName(bikert.id+"dockempty").scale.set(1,bikert.additionalProperties[7].value*10,1);
  */
       //console.log(stationcont.object3D.getObjectByName(bikert.id+"bikefree"));

      });


    })


}

},

/*
  update: function (oldData) {

    refT=Date.now();

    $.getJSON('https://api.tfl.gov.uk/BikePoint?app_id=571701b1&app_key=5e400a05f6f1c40ebfc5bbe5786044da', function (jsonBikes) {

      console.log("new data");

      jsonBikes.forEach(function (bikert)
      {
         bikefree=stationcont.object3D.getObjectByName(bikert.id+"bikefree");
         dockempty=stationcont.object3D.getObjectByName(bikert.id+"dockempty");

        bikefree.scale.set(1,bikert.additionalProperties[6].value*10,1);
        dockempty.scale.set(1,bikert.additionalProperties[7].value*10,1);

        bikefree.position.set(bikefree.position.x,bikert.additionalProperties[6].value*10/2,bikefree.position.z);
        dockempty.position.set(dockempty.position.x,bikert.additionalProperties[7].value*10/2,dockempty.position.z);
      });
    })
  }
*/


})
