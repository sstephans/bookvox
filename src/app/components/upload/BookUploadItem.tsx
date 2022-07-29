import { useMemo } from 'react';
import styled from 'styled-components';
import { Button, EditableText, Icon, Intent, Spinner } from '@blueprintjs/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import FileUploadItem from './FileUploadItem';
import useBook from '../../hooks/useBook';
import { BookUploadItemProps } from './BookUploadItemProps';

const Container = styled.div`
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: #383e47;
  display: flex;
  flex-direction: row;
  padding: 8px;
  border-radius: 8px;
  gap: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideColumn = styled(Column)`
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const MiddleColumn = styled(Column)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FileContainer = styled(PerfectScrollbar)`
  border-radius: 8px;
  background-color: #1c2127;
  box-shadow: inset 0 3px 10px rgb(0 0 0 / 0.1);
  overflow: hidden;
  max-height: 200px;
`;

const getIcon = (processing: boolean, converted: boolean) => {
  if (converted) return <Icon icon={'tick'} intent={Intent.SUCCESS} minimal />;
  return processing ? <Spinner /> : <Icon icon={'square'} minimal />;
};

const BookUploadItem = (props: BookUploadItemProps) => {
  const {
    book: { files, destination },
  } = props;
  const { sources, processing, bookName, setName, converted } = useBook(props);
  const fileItems = useMemo(
    () =>
      files.map((file, index) => (
        <FileUploadItem
          file={{ fileName: file.name, base64Src: sources[index] }}
          index={index}
        />
      )),
    [files, sources]
  );
  const indicator = useMemo(
    () => getIcon(processing, converted),
    [processing, converted]
  );

  return (
    <Container>
      <SideColumn>{indicator}</SideColumn>
      <MiddleColumn>
        <Row>
          <h2>
            <EditableText
              placeholder={'Book name...'}
              defaultValue={bookName}
              onConfirm={setName}
            />
          </h2>
        </Row>
        <Row>
          <b>Save location:</b>
          {`${destination}${bookName}`}
        </Row>
        <FileContainer>{fileItems}</FileContainer>
      </MiddleColumn>
      <SideColumn>
        <Button icon={'refresh'} minimal />
        <Button icon={'trash'} intent={Intent.DANGER} minimal />
      </SideColumn>
    </Container>
  );
};

export default BookUploadItem;
