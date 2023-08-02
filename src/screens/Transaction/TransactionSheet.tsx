import React from 'react';
import {Modalize, useModalize} from 'react-native-modalize';
import TransactionForm from './TransactionForm';

interface TransactionSheetProps {
  id?: string;
}

const TransactionSheet = (props: TransactionSheetProps) => {
  const {close, ref} = useModalize();
  const {id} = props;

  return (
    <>
      <Modalize ref={ref}>
        <TransactionForm close={close} id={id} />
      </Modalize>
    </>
  );
};

export default TransactionSheet;
