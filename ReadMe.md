# City Population service
 There are no 3rd party modules. no need to use npm install. file is being collected and store at the start of the project in a graph. The graph significantly decrease the time complexity of request by 10ms. 

## Application Structor
Application has the Controller and Repository layer. The Controller has the two request get and put. The Repository has ways to fetch and update data. In The repository there is logic of collecting the file data in constructor and storing it in a graph instance.

## Run file
``` npm start ```

## API supported routes

`GET http://127.0.0.1:5555/api/population/state/:state/city/:city`

`PUT http://127.0.0.1:5555/api/population/state/:state/city/:city`

## URL Parameter
```:state``` or  ```:city```
Url parameters that contain a space 
Please use a seperator such as ```%20``` instead of passing a space. example : 

```http://127.0.0.1:5555/api/population/state/Florida/city/Palm%20Shores```

or

```http://127.0.0.1:5555/api/population/state/Illinois/city/Balance%20of%20Olneyship```
## Ways to improve throughput
You could increase the availability of this application by creating cluster on different ports for the amount of cors that are available in the user cpu.
