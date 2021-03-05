import color from '@config/colors';
import metric from '@config/metrics';
import AsyncStorage from '@react-native-community/async-storage';
import { trans } from '@services/i18n';
import { loadCollection, loadMusic } from '@services/redux/actions';
import { dboCollection, dboMusic } from '@services/sqlite';
import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PopupConfig {
  visiable: boolean,
  setVisiable: any
}

const PopupUpdateVersion = (props: PopupConfig) => {
  const dispatch = useDispatch()
  const language = useSelector((state: any) => state?.settings.language)


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visiable}
    >
      <View style={styles.constrainOpacity}></View>
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => { props.setVisiable(false) }}
        activeOpacity={1}
      >
        <View style={styles.modalView}>
          <View style={{ height: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.title}>Update Application</Text>
          </View>
          <View style={{ height: 20, flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: "#8c8c8c" }}>The application has a new version. You often upgrade to be able to use more features.</Text>
          </View>


          <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginTop: 30 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color.BG_CARD }]}
              onPress={() => { props.setVisiable(false) }}
            >
              <Text style={{ fontSize: 16, color: color.TITLE }}>{trans('cancle', language)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                AsyncStorage.getItem('link_chplay').then(res => {
                  if (res == null) {
                    Linking.openURL('https://play.google.com/store/apps/dev?id=4934522583960256568')
                  }
                  else {
                    Linking.openURL(res)
                  }
                })
              }}
            >
              <Text style={{ fontSize: 16, color: color.TITLE }}>Update</Text>
            </TouchableOpacity>

          </View>
        </View>

      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: metric.DEVICE_WIDTH - 66,
    height: 200,
    backgroundColor: color.BG_CARD,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  title: {
    textAlign: "center",
    color: color.TITLE,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: color.BG_INPUT,
    marginTop: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    fontSize: 16,
    color: color.TITLE
  },
  button: {
    height: 40,
    width: 96,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: color.BUTTON_SHUFFLE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  constrainOpacity: {
    backgroundColor: '#000',
    opacity: 0.85,
    position: 'absolute',
    top: 0,
    left: 0,
    height: metric.DEVICE_HEIGHT + 50,
    width: metric.DEVICE_WIDTH
  }
});

export default PopupUpdateVersion;