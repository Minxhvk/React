import { useContext } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from './App';
import DiaryItem from './DiaryItem';

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaulProps = {
  diaryList: [],
};

export default DiaryList;
