import { IconTrash } from '@assets/svg';
import Header2 from '@components/atoms/Header2';
import ItemMusic from '@components/atoms/ItemMusic';
import PopupDelete from '@components/atoms/PopupDelete';
import PopupRename from '@components/atoms/PopupRename';
import PopupCollection from '@components/atoms/PopupCollection';
import color from '@config/colors';
import stylesGeneral from '@config/stylesGeneral';
import { resetEdit, setEditMode, setIndexPlaying, setInfoMusicPlaying, setShuffle, showMusicControl, showTabbar } from '@services/redux/actions';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PopupCreateCollect from '@components/atoms/PopupCreateCollect';
import {fn_GetRandomID} from '@services/api'
import { useNavigation } from '@react-navigation/native';
import { PLAYMUSIC } from '@config/constrans';

const renderItem = ({ item, index }) => (
    <ItemMusic data={item} index={index} />
);

const ListMusic = (props) => {
    const [showButtonDone, setShowButtonDone] = useState(false)
    const [paddingBottomFlatlist, setPaddingBottomFlatlist] = useState(10)
    const dispatch = useDispatch();
    const listMusic = useSelector((state: any) => state?.listMusic)
    const [showControlEdit, setShowControlEdit] = useState(false)
    const [showButtonRename, setShowButtonRename] = useState(true)
    const [listData, setListData] = useState<any[]>([])
    const listEditMusic = useSelector((state: any) => state?.listEditMusic)
    const [showPopupRename, setShowPopupRename] = useState(false)
    const [showPopupDelete, setShowPopupDelete] = useState(false)
    const [showPopupCollection, setShowPopupCollection] = useState(false)
    const editMode = useSelector((state: any) => state?.editMode)
    const [showCreateCollection, setShowCreateCollection] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(showTabbar(true))
        return () => {
            dispatch(showTabbar(false))
            dispatch(setEditMode(false))
        }
    }, [])

    useEffect(() => {
        if (listEditMusic.length > 1) {
            setShowButtonRename(false)
        }
        else if (listEditMusic.length > 0) {
            setShowControlEdit(true)
            setShowButtonRename(true)
        }
        else {
            setShowControlEdit(false)
        }
    }, [listEditMusic])

    useEffect(() => {
        let data: any[] = []
        if (listMusic != undefined || listMusic.length > 0) {
            listMusic.forEach((element: any) => {
                if (props.route.params.id == 1) {
                    data.push(element)
                }
                else if (element.id_collection == props.route.params.id) {
                    data.push(element)
                }
            })
        }
        setListData(data)
    }, [listMusic])

    return (
        <View style={[stylesGeneral.container]}>
            <Header2
                title={editMode ? "Edit Music" : `${props.route.params.name} Collection`}
                buttonLeft={editMode ? null : true}
                buttonDone={showButtonDone}
                onEdit={() => {
                    setShowButtonDone(true)
                    setPaddingBottomFlatlist(70)
                    dispatch(setEditMode(true))
                }}
                onDone={() => {
                    setShowButtonDone(false)
                    setPaddingBottomFlatlist(10)
                    dispatch(setEditMode(false))
                }}
            />
            <PopupRename
                visiable={showPopupRename}
                data={listEditMusic[0]}
                type={2}
                setVisiable={setShowPopupRename}
            />

            <PopupDelete
                visiable={showPopupDelete}
                data={listEditMusic}
                type={2}
                setVisiable={setShowPopupDelete}
            />

            <PopupCollection
                visiable={showPopupCollection}
                setVisiable={setShowPopupCollection}
                data={listEditMusic}
                setVisiableCreate={setShowCreateCollection}
            />

            <PopupCreateCollect
                visiable={showCreateCollection}
                setVisiable={setShowCreateCollection}
            />

            {!editMode ? (
                <TouchableOpacity
                    style={[styles.button, stylesGeneral.centerAll]}
                    onPress={()=>{
                       let indexRandom = fn_GetRandomID(listData.length-1)
                       dispatch(showMusicControl(true))
                       dispatch(setShuffle(true))
                       dispatch(setInfoMusicPlaying(listData[indexRandom]))
                       dispatch(setIndexPlaying(indexRandom))
                       navigation.navigate(PLAYMUSIC);
                    }}
                >
                    <Text style={styles.textButton}>Shuffle Play</Text>
                </TouchableOpacity>) : null}

            <View style={[styles.constainList, { paddingBottom: paddingBottomFlatlist }]}>
                <FlatList
                    data={listData}
                    renderItem={({ item, index }) => renderItem({ item, index })}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            {showControlEdit ? (<View style={styles.constainMenu}>
                {showButtonRename ? (<TouchableOpacity style={[stylesGeneral.centerAll, styles.buttonEdit]}>
                    <Text
                        style={styles.textButtonEdit}
                        onPress={() => { setShowPopupRename(true) }}
                    >Rename</Text>
                </TouchableOpacity>) : null}
                <TouchableOpacity
                    style={[stylesGeneral.centerAll, styles.buttonEdit]}
                    onPress={() => {
                        setShowPopupCollection(true)
                    }}
                >
                    <Text style={styles.textButtonEdit}>Move</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesGeneral.centerAll, styles.buttonDelete]}
                    onPress={() => {
                        setShowPopupDelete(true)
                    }}
                >
                    <IconTrash />
                </TouchableOpacity>
            </View>) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 18,
        marginHorizontal: 90,
        borderRadius: 24,
        height: 46,
        backgroundColor: color.BUTTON_SHUFFLE
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.TITLE
    },
    constainList: {
        flex: 1,
        marginTop: 18,
        marginHorizontal: 16,
    },
    constainMenu: {
        height: 48,
        marginBottom: 12,
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row'
    },
    buttonEdit: {
        height: 48,
        width: 90,
        borderRadius: 12,
        backgroundColor: color.BG_BUTTON,
        marginHorizontal: 8
    },
    textButtonEdit: {
        fontSize: 16,
        color: color.TITLE
    },
    buttonDelete: {
        height: 48,
        width: 48,
        borderRadius: 12,
        backgroundColor: color.BG_BUTTON_DELETE,
        marginLeft: 8,
        marginRight: 16
    },
})

export default ListMusic;
