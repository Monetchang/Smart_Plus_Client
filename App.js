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
import { createStackNavigator } from 'react-navigation'
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
class App extends Component<Props> {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "",
      headerStyle: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerLeft: (
        <Button title={"Back"} onPress={()=>application.back()}/>
      ),
      headerRight: (
        <Button title={"DEV"} onPress={()=>DevMenu.show()}/>
      ),
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      progress: 0,
    }
  }

  componentDidMount() {
    this.downloadBundle()
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
      .fetch('GET', 'http://localhost:8000/singleView.jsbundle')

    this.downloadTask.progress({ count : 5 }, (received, total) => {
        console.log('progress', received / total)
        this.setState({
          progress: Math.round(received / total * 100),
        })
      })
      .then((res) => {
        this.setState({
          progress: 100,
        })
        // the temp file path
        console.log('The file saved to ', res)
        this.loadBundle()
      })
      .catch((err) => {
        this.setState({
          progress: 100,
        })
        // error handling ..
        console.log("download bundle error", err)
        alert("Bundle download failed! " + err)
      })

    // 30 秒下载超时
    if (this.downloadBundleTimeout) {
      clearTimeout(this.downloadBundleTimeout)
      this.downloadBundleTimeout = undefined
    }
    this.downloadBundleTimeout = setTimeout(()=>{
      this.downloadTask.cancel((err) => {
        alert("下载超时，请检查网络后重试")
      })
      this.downloadBundleTimeout = undefined
    }, 1000*30)
    // this.downloadTask.cancel((err) => { ... })
  }

  loadBundle = () => {
    setTimeout(application.restartRCTView, 1000)
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.progressBarContainer}>
          <View style={{...styles.progressBar, width: `${this.state.progress}%`}} />
        </View>

        <Text style={styles.instructions}>loading... {this.state.progress}%</Text>

        {/*<Button title="Start Download" onPress={this.downloadBundle}/>*/}

        {/*<Button title={"Display Developer Menu"} onPress={this.displayDebugMenu}/>*/}
        {/*<Button title={"Load New Page"} onPress={this.loadNewPage}/>*/}
        {/*<Button title={"Back"} onPress={this.back}/>*/}
        {/*<Button title={"Back Home"} onPress={this.backHome}/>*/}
      </View>
    )
  }
}

export default createStackNavigator({
  Home: {
    screen: App,
  },
})

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    marginTop: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: 8,
    width: 200,
    backgroundColor: "#eaeaea",
    borderRadius: 4,
  },
  progressBar: {
    flexGrow: 0,
    borderRadius: 4,
    backgroundColor: "#4FBA80",
    width: "50%",
  },
}
