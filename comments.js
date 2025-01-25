import React from 'react';
import Giscus from '@giscus/react';

const Comments = () => {
  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <Giscus
        repo="https://giscus.app/client.js"
        repoId="R_kgDONvIHlw"
        category="Announcements"
        categoryId="DIC_kwDONvIHl84CmVOA"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
};

export default Comments;
