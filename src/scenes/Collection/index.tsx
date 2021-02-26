import { IconSearch, IconTrash } from '@assets/svg';
import { ItemCollection } from '@components/atoms';
import Header from '@components/atoms/Header';
import PopupDelete from '@components/atoms/PopupDelete';
import PopupRename from '@components/atoms/PopupRename';
import color from '@config/colors';
import stylesGeneral from '@config/stylesGeneral';
import { setEditMode, showTabbar } from '@services/redux/actions';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { trans } from "@services/i18n"


const renderItem = ({ item }) => (
    <ItemCollection name={item.name} thumbnail={item.thumbnail != undefined ? item.thumbnail : ''} id={item.id} />
);

const Collection = () => {
    const dispatch = useDispatch()
    const editMode = useSelector((state: any) => state?.editMode)
    const listCollection = useSelector((state: any) => state?.listCollection)
    const showMusic = useSelector((state: any) => state?.showMusic)
    const language = useSelector((state: any) => state?.settings.language)
    const listCollectionEdit = useSelector((state: any) => state?.listCollectionEdit)
    const [showButtonDone, setShowButtonDone] = useState(false)
    const [showButtonRename, setShowButtonRename] = useState(true)
    const [showControlEdit, setShowControlEdit] = useState(false)
    const [showPopupRename, setShowPopupRename] = useState(false)
    const [showPopupDelete, setShowPopupDelete] = useState(false)
    const [listDataShow, setListDataShow] = useState<any[]>([])

    const search = (text: any) => {
        setListDataShow(listCollection.filter((val: any) => {
            let value = text.toLocaleLowerCase();
            if (val.name != "" && val.name.toLocaleLowerCase().search(text.toLocaleLowerCase()) > -1) return true;
            return false;
        }))

        if (text == "") {
            setListDataShow(listCollection)
        }
    }

    useEffect(()=>{
        dispatch(showTabbar(false))
    },[])

    useEffect(() => {
        if (listCollectionEdit != undefined) {
            if (listCollectionEdit.length > 1) {
                setShowButtonRename(false)
            }
            else if (listCollectionEdit.length > 0) {
                setShowControlEdit(true)
                setShowButtonRename(true)
            }
            else {
                setShowControlEdit(false)
            }
        }
    }, [listCollectionEdit])

    useEffect(() => {
        setListDataShow(listCollection)
    }, [listCollection])

    return (
        <View style={stylesGeneral.container}>

            <Header
                title={editMode ? (trans('edit_collection', language)) : (trans('collection', language))}
                paddingLeft={16}
                buttonRight={true}
                onEdit={() => {
                    dispatch(setEditMode(true))
                    setShowButtonDone(true)
                }}
                buttonDone={showButtonDone}
                onDone={() => {
                    dispatch(setEditMode(false))
                    setShowButtonDone(false)
                }}
            />
            <PopupRename
                visiable={showPopupRename}
                data={listCollectionEdit[0]}
                type={1}
                setVisiable={setShowPopupRename}
            />

            <PopupDelete
                visiable={showPopupDelete}
                data={listCollectionEdit}
                type={1}
                setVisiable={setShowPopupDelete}
            />

            <View style={styles.searchBg}>
                <View style={styles.iconSearchBg}>
                    <IconSearch />
                </View>
                <TextInput
                    style={styles.inputSearch}
                    placeholder={trans('search_collection', language)}
                    placeholderTextColor={color.PLACEHOLDER}
                    selectionColor={color.PLACEHOLDER}
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={(value) => {
                        search(value)
                    }}
                />
            </View>

            <View style={styles.constainList}>
                <FlatList
                    data={listDataShow}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>

            {showControlEdit ? (
                <View style={styles.constainMenu}>
                    {showButtonRename ?
                        (<TouchableOpacity
                            style={[stylesGeneral.centerAll, styles.buttonEdit]}
                            onPress={() => {
                                setShowPopupRename(true)
                            }}>
                            <Text style={styles.textButtonEdit}>{trans('rename', language)}</Text>
                        </TouchableOpacity>) : null}
                    <TouchableOpacity
                        style={[stylesGeneral.centerAll, styles.buttonDelete]}
                        onPress={() => {
                            setShowPopupDelete(true)
                        }}
                    >
                        <IconTrash />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBg: {
        flexDirection: 'row',
        height: 46,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 24,
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: color.BG_INPUT
    },
    iconSearchBg: {
        height: 20,
        width: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        marginLeft: 12,
        marginRight: 15,
        flex: 1,
        fontSize: 16,
        color: color.TITLE
    },
    constainList: {
        padding: 8,
        marginTop: 8,
        flex: 1,
    },
    constainMenu: {
        height: 48,
        marginBottom: 22,
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

export default Collection;