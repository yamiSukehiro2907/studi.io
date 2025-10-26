import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";
import { socket } from "@/config/socket";
import { Minus, Plus, Trash2, MousePointer, Pencil } from "lucide-react";

interface WhiteboardProps {
  roomId: string;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushWidth, setBrushWidth] = useState(3);

  useEffect(() => {
    const handleDrawing = async (data: any) => {
      console.log("WHITEBOARD: Received drawing event", data);

      const payload = data.payload || data;
      const incomingRoomId = data.roomId;

      if (incomingRoomId && incomingRoomId !== roomId) {
        console.log("Ignoring drawing from different room");
        return;
      }

      const canvas = fabricCanvasRef.current;
      if (!canvas) {
        console.log("Canvas not initialized yet");
        return;
      }

      try {
        console.log("Attempting to add object:", payload);
        const objects = await fabric.util.enlivenObjects([payload]);

        if (objects && objects[0]) {
          const obj = objects[0] as fabric.FabricObject;
          obj.selectable = false;
          obj.evented = false;
          canvas.add(obj);
          canvas.renderAll();
          console.log("Successfully added drawing to canvas");
        } else {
          console.log("No objects created from payload");
        }
      } catch (error) {
        console.error("Error enlivening object:", error);
      }
    };

    console.log("WHITEBOARD: Registering drawing listener");
    socket.on("drawing", handleDrawing);

    return () => {
      console.log("WHITEBOARD: Unregistering drawing listener");
      socket.off("drawing", handleDrawing);
    };
  }, [roomId]);

  useEffect(() => {
    if (!canvasRef.current || !canvasRef.current.parentElement) return;

    const parent = canvasRef.current.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: width,
      height: height,
      backgroundColor: "#ffffff",
    });
    fabricCanvasRef.current = canvas;

    const brush = new fabric.PencilBrush(canvas);
    brush.color = brushColor;
    brush.width = brushWidth;
    canvas.freeDrawingBrush = brush;

    const handlePathCreated = (e: any) => {
      const pathObject = e.path;
      if (!pathObject) return;

      const pathData = pathObject.toObject();
      console.log("WHITEBOARD: Emitting drawing", pathData);
      socket.emit("drawing", {
        roomId: roomId,
        payload: pathData,
      });
    };

    canvas.on("path:created", handlePathCreated);

    return () => {
      canvas.off("path:created", handlePathCreated);
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [roomId, brushColor, brushWidth]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.isDrawingMode = isDrawingMode;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushWidth;
      }
    }
  }, [isDrawingMode, brushColor, brushWidth]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = fabricCanvasRef.current;
      const parent = canvasRef.current?.parentElement;
      if (canvas && parent) {
        canvas.setWidth(parent.clientWidth);
        canvas.setHeight(parent.clientHeight);
        canvas.renderAll();
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    handleResize();

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const handleClearCanvas = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "#ffffff";
      canvas.renderAll();
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      <div className="absolute top-2 left-2 z-10 bg-base-100 p-2 rounded-lg shadow-md flex gap-1 items-center flex-wrap">
        <button
          className={`btn btn-sm btn-square ${
            isDrawingMode ? "btn-active btn-primary" : "btn-ghost"
          }`}
          onClick={() => setIsDrawingMode(true)}
          title="Pencil"
        >
          <Pencil size={16} />
        </button>
        <button
          className={`btn btn-sm btn-square ${
            !isDrawingMode ? "btn-active btn-primary" : "btn-ghost"
          }`}
          onClick={() => setIsDrawingMode(false)}
          title="Select/Move"
        >
          <MousePointer size={16} />
        </button>
        <div className="divider divider-horizontal mx-0"></div>
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          className="w-8 h-8 p-0 border border-base-300 rounded cursor-pointer"
          title="Brush Color"
        />
        <div className="flex items-center gap-1">
          <button
            className="btn btn-xs btn-ghost btn-circle"
            onClick={() => setBrushWidth(Math.max(1, brushWidth - 1))}
            title="Decrease Size"
          >
            <Minus size={12} />
          </button>
          <input
            type="range"
            min="1"
            max="30"
            value={brushWidth}
            onChange={(e) => setBrushWidth(parseInt(e.target.value, 10))}
            className="range range-xs w-20 mx-1"
            title={`Brush Size: ${brushWidth}`}
          />
          <button
            className="btn btn-xs btn-ghost btn-circle"
            onClick={() => setBrushWidth(Math.min(50, brushWidth + 1))}
            title="Increase Size"
          >
            <Plus size={12} />
          </button>
          <span className="text-xs w-4 text-center">{brushWidth}</span>
        </div>
        <div className="divider divider-horizontal mx-0"></div>
        <button
          className="btn btn-sm btn-ghost text-error"
          onClick={handleClearCanvas}
          title="Clear Canvas"
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Whiteboard;
