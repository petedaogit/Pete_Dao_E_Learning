import React, { useRef, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import uniqid from "uniqid";
import Quill from "quill";

function AddCourse() {
  const quillRef = React.useRef(null);
  const editorRef = useRef(null);
  const [courseTitle, setCourseTitle] = React.useState("");
  const [coursePrice, setCoursePrice] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [chapters, setChapters] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  useEffect(() => {
    // Initialize Quill editor only once
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
        action=""
      >
        <div className="flex flex-col gap-1">
          <p>Course title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
            type="text"
            placeholder="Type here"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Course description</p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
              type="number"
              placeholder="0"
            />
          </div>
          <div className="flex md:flex-row flex-col items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded"
                alt=""
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : null}
                alt=""
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Discount</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            type="number"
            min={0}
            max={100}
            placeholder="0"
            required
          />
        </div>

        {/* adding chapters & lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div className="bg-white border rounded-lg mb-4" key={chapterIndex}>
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}
                    {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  alt=""
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>
                        -{lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        alt=""
                      />
                    </div>
                  ))}
                  <div className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2">
                    ++ Add lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer">
            +Add Chapter
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <input
                  type="text"
                  className="mt-1 block w-full border grounded py-1 px-2"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <p>Lecture Title</p>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded py-1 px-2"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <p>Duration (minutes)</p>
                <input
                  type="number"
                  className="mt-1 block w-full border rounded py-1 px-2"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <p>Lecture URL</p>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded py-1 px-2"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
