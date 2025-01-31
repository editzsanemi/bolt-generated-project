import React, { useState, useRef, useEffect } from 'react';
    import styled, { keyframes } from 'styled-components';
    import { useTransition, animated, useSpring } from 'react-spring';

    const fadeIn = keyframes`
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;

    const AppContainer = styled.div`
      text-align: center;
      padding: 20px;
      background-color: #2a2a2a;
      border-radius: 20px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      animation: ${fadeIn} 0.5s ease-out;
      position: relative;
      display: inline-block;
      overflow: hidden;
    `;

    const Title = styled.h1`
      color: #F0E6EF;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
      font-size: 2.2em;
    `;

    const InputContainer = styled.div`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      z-index: 1;
    `;

    const CuteInput = styled.input`
      padding: 14px;
      border: 2px solid #ffb6c1;
      border-radius: 30px;
      margin: 0 10px;
      flex: 1;
      outline: none;
      font-size: 16px;
      background-color: #444;
      color: white;
      &::placeholder {
        color: #ffb6c1;
      }
      padding-left: 40px;
    `;

    const AddButton = styled.button`
      background-color: #ffb6c1;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 30px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #ff8eb3;
      }
      z-index: 1;
    `;

    const TodoList = styled.ul`
      list-style: none;
      padding: 0;
      z-index: 1;
    `;

    const TodoItem = styled(animated.li)`
      padding: 14px;
      background-color: #444;
      color: white;
      border-radius: 10px;
      margin-bottom: 10px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: ${fadeIn} 0.3s ease-out;
    `;

    const DeleteButton = styled.button`
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #c0392b;
      }
    `;

    const KittyEar = styled.div`
      width: 0;
      height: 0;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      border-bottom: 32px solid #ffb6c1;
      position: absolute;
      top: -22px;
    `;

    const LeftEar = styled(KittyEar)`
      left: 15px;
      transform: rotate(-30deg);
    `;

    const RightEar = styled(KittyEar)`
      right: 15px;
      transform: rotate(30deg);
    `;

    const Heart = styled(animated.span)`
      font-size: 50px;
      color: #ffb6c1;
      position: absolute;
      top: 50%;
      left: calc(100% + 20px);
      transform: translateY(-50%);
      user-select: none;
    `;

    const Bow = styled.span`
      font-size: 24px;
      color: #ffb6c1;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      user-select: none;
    `;

    function App() {
      const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });
      const [inputValue, setInputValue] = useState('');
      const [heartKey, setHeartKey] = useState(0);
      const appContainerRef = useRef(null);

      const transitions = useTransition(todos, {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        leave: { opacity: 0, transform: 'translateY(-10px)' },
      });

      const heartAnimation = useSpring({
        to: { opacity: 1, transform: 'scale(1)' },
        from: { opacity: 0, transform: 'scale(0.5)' },
        reset: true,
        config: { duration: 200 },
        onRest: () => setHeartKey(0),
      });

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (inputValue.trim()) {
          setTodos([...todos, { id: Date.now(), text: inputValue }]);
          setInputValue('');
          setHeartKey(Date.now());
        }
      };

      const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
      };

      return (
        <div style={{ position: 'relative' }}>
          <AppContainer ref={appContainerRef}>
            <LeftEar />
            <RightEar />
            <Title>My Cute Todo List</Title>
            <InputContainer>
              <Bow>🎀</Bow>
              <CuteInput
                type="text"
                placeholder="Add a todo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <AddButton onClick={addTodo}>Add</AddButton>
            </InputContainer>
            <TodoList>
              {transitions((style, item) => (
                <TodoItem style={style} key={item.id}>
                  {item.text}
                  <DeleteButton onClick={() => deleteTodo(item.id)}>
                    Delete
                  </DeleteButton>
                </TodoItem>
              ))}
            </TodoList>
          </AppContainer>
          {heartKey ? <Heart style={heartAnimation} key={heartKey}>💖</Heart> : null}
        </div>
      );
    }

    export default App;
