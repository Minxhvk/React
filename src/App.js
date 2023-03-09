import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import LifeCycle from './LifeCycle';
import OptimizeTest from './OptimizeTest';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);

  // useReducer는 useCallback을 사용하지 않아도 자동으로 적용된다 ?
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // useCallback -> Callback을 memo 후 변화하지 않으면 재선언 X
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;

    // 함수형 업데이트를 통해 최신 데이터를 반영하게 한다.
    // setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', data: targetId });

    // 함수형 업데이트를 통해 최신 데이터를 반영하게 한다.
    // setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', data: newContent });

    // 함수형 업데이트를 통해 최신 데이터를 반영하게 한다.
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);

  const memoizedDispatches = useMemo(() => {
    return [onCreate, onRemove, onEdit];
  });

  // useMemo -> 배열에 있는 값들이 수정되기 전에는 업데이트하지 않는다.
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext value={memoizedDispatches}>
        <div className="App">
          <LifeCycle />
          <OptimizeTest />
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}</div>
          <DiaryList onRemove={onRemove} onEdit={onEdit} />
        </div>
      </DiaryDispatchContext>
    </DiaryStateContext.Provider>
  );
}

export default App;
