import { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  FaBug,
  FaRocket,
  FaCode,
  FaPlay,
  FaBook,
  FaBolt,
} from "react-icons/fa";

import "./App.css";

export default function App() {
  const [code, setCode] = useState(`public class Main{
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`);

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const buttons = [
    {
      title: "Review",
      task: "review",
      color: "#2563eb",
      icon: <FaCode />,
    },
    {
      title: "Errors",
      task: "errors",
      color: "#dc2626",
      icon: <FaBug />,
    },
    {
      title: "Improve",
      task: "improvements",
      color: "#16a34a",
      icon: <FaRocket />,
    },
    {
      title: "Output",
      task: "output",
      color: "#ca8a04",
      icon: <FaPlay />,
    },
    {
      title: "Explain",
      task: "explain",
      color: "#9333ea",
      icon: <FaBook />,
    },
    {
      title: "Optimize",
      task: "optimize",
      color: "#ea580c",
      icon: <FaBolt />,
    },
  ];

  async function handleAI(task) {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/ai/get-response",
        {
          prompt: code,
          task,
        }
      );

      setResponse(res.data.result);
    } catch (err) {
      setResponse(
        "# ❌ Error\nUnable to connect to backend.\n\nMake sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">

      <div className="blob blob1"></div>
<div className="blob blob2"></div>
<div className="blob blob3"></div>
<div className="blob blob4"></div>

      <div className="header">

        <div className="glassHeader">

        <h1>AI Code Reviewer</h1>

        <p>
          Analyze your code, detect errors, explain logic, optimize performance
          and predict outputs instantly using AI.
        </p>

        </div>

      </div>

      <div className="workspace">

        <div className="editorContainer">

          <div className="floatingButtons">

            {buttons.map((btn) => (
              <button
                key={btn.task}
                style={{ background: btn.color }}
                onClick={() => handleAI(btn.task)}
              >
                {btn.icon}
                <span>{btn.title}</span>
              </button>
            ))}

          </div>

          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              fontLigatures: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />

        </div>

        <div className="output">

          {loading ? (
            <div className="loading">
              Generating AI Response...
            </div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }) {
                  const match =
                    /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={className}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {response}
            </ReactMarkdown>
          )}

        </div>

      </div>

    </div>
  );
}

