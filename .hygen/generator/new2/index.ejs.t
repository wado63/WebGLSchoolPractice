---
to: src/works/<%= name %>.ts
---

// <%= name %> ======================================================================
// FIXME: description
// ============================================================================

import * as THREE from "three";
import { BasicView } from "~/modules/BaseView2";

window.addEventListener(
  "DOMContentLoaded",
  () => {
    const basicView = new BasicView();

    // space押下時のanimation設定
    basicView.animate = () => {
      // override
    };

    basicView.render();
    basicView.startRendering();
  },
  false
);
