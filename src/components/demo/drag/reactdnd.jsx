import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.scss';

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class DragReactDnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
      items1: [],
      droppableId: null,
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(result) {
    const droppableId = result.source.droppableId;
    this.setState({
      droppableId,
    });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { items, items1, droppableId } = this.state;
    const flag = result.destination.droppableId === 'droppable';
    const fn = result.destination.droppableId === droppableId;
    if (fn) {
      const l = flag ? items : items1;
      const s = flag ? 'items' : 'items1';
      const list = reorder(
        l,
        result.source.index,
        result.destination.index
      );
      this.setState({
        [s]: list,
      });
    } else {
      const e = flag ? items : items1;
      const s = !flag ? items : items1;
      const es = flag ? 'items' : 'items1';
      const ss = !flag ? 'items' : 'items1';
      const [i] = s.splice(result.source.index, 1);
      e.splice(result.destination.index, 0, i);
      this.setState({
        [ss]: s,
        [es]: e,
      });
    }
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="dnd-demo-item"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable1">
          {(provided, snapshot) => (
            <div
              className="dnd-demo-item"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragReactDnd;