import {FlatListProps, FlatList, View} from 'react-native';

export interface CustomFlatListProps<ItemT>
  extends FlatListProps<ItemT>,
    FlatListProps<ItemT> {
  itemSpace?: number;
  headerSpace?: number;
  footerSpace?: number;
  onRef?: any;
}

export default function CFlatList<ItemT = any>(
  props: CustomFlatListProps<ItemT>,
) {
  return (
    <FlatList
      ref={props.onRef}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{width: props.itemSpace, height: props.itemSpace}} />
      )}
      ListFooterComponent={() => (
        <View style={{width: props.footerSpace, height: props.footerSpace}} />
      )}
      ListHeaderComponent={() => (
        <View style={{width: props.headerSpace, height: props.headerSpace}} />
      )}
      {...props}
      style={[{flexGrow: 0}, props.style]}
    />
  );
}
