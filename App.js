/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native"
import RNFetchBlob from "rn-fetch-blob"
import {NativeModules, NativeEventEmitter} from "react-native"

const application = NativeModules.Application
const DevMenu = NativeModules.DevMenu
const ilop = NativeModules.ilop
const ilopEmitter = new NativeEventEmitter(ilop)

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
})

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      progress: 0,
    }
  }

  componentDidMount() {

  }

  displayDebugMenu = () => {
    // application.displayDevMenu()
    DevMenu.show()
  }

  loadNewPage = () => {
    application.loadPageWithOptions("hello", {
      online: true,
      host: "192.168.1.105",
      port: "8088",
      applicationName: "TestProject",
    })
  }

  back = () => {
    application.back()
  }

  backHome = () => {
    application.backHome()
  }

  downloadBundle = () => {
    let dirs = RNFetchBlob.fs.dirs
    this.downloadTask = RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path : dirs.DocumentDir + '/singleView.jsbundle'
    })
      .fetch('GET', 'http://192.168.1.208:8000/singleView.jsbundle')

    this.downloadTask.progress({ count : 5 }, (received, total) => {
        console.log('progress', received / total)
        this.setState({
          progress: Math.round(received / total),
        })
      })
      .then((res) => {
        // the temp file path
        console.log('The file saved to ', res)
        application.restartRCTView()
      })
      .catch((err) => {
        // error handling ..
        console.log("download bundle error", err)
      })
    // this.downloadTask.cancel((err) => { ... })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Progress: {this.state.progress}</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Start Download" onPress={this.downloadBundle}/>

        <Button title={"Display Developer Menu"} onPress={this.displayDebugMenu}/>
        <Button title={"Load New Page"} onPress={this.loadNewPage}/>
        <Button title={"Back"} onPress={this.back}/>
        <Button title={"Back Home"} onPress={this.backHome}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
})
