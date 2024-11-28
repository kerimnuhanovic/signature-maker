import { Rnd } from "react-rnd"
import { Rectangle } from "../models/Rectangle"

interface RectangleShapeProps {
    rectangle: Rectangle;
    setRectangle: (rectangle: Rectangle) => void;
}

export const RectangleShape = ({ rectangle, setRectangle }: RectangleShapeProps) => {
    return (
        <Rnd
            size={{ width: rectangle.width, height: rectangle.height }}
            position={{ x: rectangle.x, y: rectangle.y }}
            onDragStop={(_, d) => setRectangle({ ...rectangle, x: d.x, y: d.y })}
            onResizeStop={(_e, _direction, ref, _delta, position) =>
                setRectangle({
                      x: position.x,
                      y: position.y,
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                })
            }
            bounds="parent"
            className="border border-dashed border-2 border-gray-900"
        />
    )
}