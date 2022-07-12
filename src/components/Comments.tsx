import { useSession } from "next-auth/react";
import React,{ useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { fixCommentFormat } from "../../lib/utils";
import { useMainContext } from "../MainContext";
import { loadMoreComments, loadPost } from "../RedditAPI";
import ChildComments from "./ChildComments";

const Comments = ({ comments, readTime, sort="top", depth = 0, op = "", portraitMode = false, thread, locked=false, scoreHideMins=0, setCommentsReady,  }) => {
  const { data: session, status } = useSession();
  const context: any = useMainContext();
  const [commentsData, setCommentsData] = useState<any[]>();
  useEffect(() => {
    comments && setCommentsData(comments); 
  }, [comments])
  useEffect(() => {
    commentsData && setCommentsReady(true);
  }, [commentsData])
  
  
  const loadChildComments = async () => {

    if (session) {
      thread.fetchNextPage(); 
    } else {
      context.toggleLoginModal();
    }
  };
  return (
    <div className="">
      {commentsData?.map((comment, i) => (
        <div key={`${i}_${comment?.data?.id}`} className="py-1 ">
          {comment?.kind === "more" ? (
            <button
              className={
                "text-sm pl-2 text-semibold flex hover:font-semibold w-full " +
                (thread.isFetching ? " animate-pulse" : " ")
              }
              disabled={thread.isFetching}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                loadChildComments(); 
              }}
            >
              Load {comment?.data?.count} More...
            </button>
          ) : (
            <>
              <ChildComments
                comment={comment}
                depth={depth}
                hide={false}
                op={op}
                portraitMode={portraitMode}
                locked={locked}
                scoreHideMins={scoreHideMins}
                readTime={readTime}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
