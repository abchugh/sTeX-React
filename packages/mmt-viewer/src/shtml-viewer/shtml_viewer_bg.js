let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_4.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
                state.a = 0;
                CLOSURE_DTORS.unregister(state);
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
 * sets the server url used to the provided one; by default `https://immt.mathhub.info`.
 * @param {string} server_url
 */
export function set_server_url(server_url) {
    const ptr0 = passStringToWasm0(server_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.set_server_url(ptr0, len0);
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_4.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
/**
 * render an SHTML document to the provided element
 * #### Errors
 * @param {HTMLElement} to
 * @param {DocumentOptions} document
 * @param {((uri: string) => Element | null) | undefined} [on_section_start]
 * @param {((uri: string) => Element | null) | undefined} [on_section_end]
 * @returns {SHTMLMountHandle}
 */
export function render_document(to, document, on_section_start, on_section_end) {
    const ret = wasm.render_document(to, document, isLikeNone(on_section_start) ? 0 : addToExternrefTable0(on_section_start), isLikeNone(on_section_end) ? 0 : addToExternrefTable0(on_section_end));
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return SHTMLMountHandle.__wrap(ret[0]);
}

function __wbg_adapter_44(arg0, arg1, arg2) {
    wasm.closure39_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_47(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hd4b7f4649a5ddcca(arg0, arg1);
}

function __wbg_adapter_54(arg0, arg1, arg2, arg3) {
    wasm.closure81_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_59(arg0, arg1, arg2) {
    const ret = wasm.closure201_externref_shim(arg0, arg1, arg2);
    return ret >>> 0;
}

const __wbindgen_enum_ReadableStreamType = ["bytes"];

const __wbindgen_enum_ScrollBehavior = ["auto", "instant", "smooth"];

const __wbindgen_enum_ScrollLogicalPosition = ["start", "center", "end", "nearest"];

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));

export class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));

export class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

export class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}

const SHTMLMountHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shtmlmounthandle_free(ptr >>> 0, 1));

export class SHTMLMountHandle {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SHTMLMountHandle.prototype);
        obj.__wbg_ptr = ptr;
        SHTMLMountHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SHTMLMountHandleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shtmlmounthandle_free(ptr, 0);
    }
    /**
     * unmounts the view and cleans up the reactive system.
     * Not calling this is a memory leak
     */
    unmount() {
        wasm.shtmlmounthandle_unmount(this.__wbg_ptr);
    }
}

export function __wbg_String_8f0eb39a4a4c2f66(arg0, arg1) {
    const ret = String(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_addEventListener_2a431e3634cd7154() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
}, arguments) };

export function __wbg_addEventListener_b9481c2c2cab6047() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_add_5804f40d86407769() { return handleError(function (arg0, arg1, arg2) {
    arg0.add(getStringFromWasm0(arg1, arg2));
}, arguments) };

export function __wbg_add_eea872a240540afa() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.add(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_altKey_d5409f5ddaa29593(arg0) {
    const ret = arg0.altKey;
    return ret;
};

export function __wbg_appendChild_d22bc7af6b96b3f1() { return handleError(function (arg0, arg1) {
    const ret = arg0.appendChild(arg1);
    return ret;
}, arguments) };

export function __wbg_body_8d7d8c4aa91dcad8(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_bottom_72e7516e4f4e156a(arg0) {
    const ret = arg0.bottom;
    return ret;
};

export function __wbg_buffer_61b7ce01341d7f88(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_buffer_dc5dbfa8d5fb28cf(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_byobRequest_1fc36a0c1e98611b(arg0) {
    const ret = arg0.byobRequest;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_byteLength_1b2d953758afc500(arg0) {
    const ret = arg0.byteLength;
    return ret;
};

export function __wbg_byteOffset_7ef484c6c1d473e9(arg0) {
    const ret = arg0.byteOffset;
    return ret;
};

export function __wbg_call_500db948e69c7330() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_call_6eed6e86f91d71e9(arg0, arg1, arg2) {
    const ret = arg0.call(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_call_b0d8e36992d9900d() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_cancelAnimationFrame_5f7904867f6ab804() { return handleError(function (arg0, arg1) {
    arg0.cancelAnimationFrame(arg1);
}, arguments) };

export function __wbg_cancelBubble_4f3b0a3179912b26(arg0) {
    const ret = arg0.cancelBubble;
    return ret;
};

export function __wbg_classList_70dfb662dbbb3e55(arg0) {
    const ret = arg0.classList;
    return ret;
};

export function __wbg_clearTimeout_af66bc7e0dd9b02b(arg0, arg1) {
    arg0.clearTimeout(arg1);
};

export function __wbg_clientX_f73b86b8aba3591d(arg0) {
    const ret = arg0.clientX;
    return ret;
};

export function __wbg_clientY_0974153484cf0d09(arg0) {
    const ret = arg0.clientY;
    return ret;
};

export function __wbg_cloneNode_bf6c15516b73d54c() { return handleError(function (arg0, arg1) {
    const ret = arg0.cloneNode(arg1 !== 0);
    return ret;
}, arguments) };

export function __wbg_cloneNode_d247de63446fb130() { return handleError(function (arg0) {
    const ret = arg0.cloneNode();
    return ret;
}, arguments) };

export function __wbg_close_59511bda900d85a8() { return handleError(function (arg0) {
    arg0.close();
}, arguments) };

export function __wbg_close_65cb23eb0316f916() { return handleError(function (arg0) {
    arg0.close();
}, arguments) };

export function __wbg_code_878e1961e18ba92f(arg0, arg1) {
    const ret = arg1.code;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_composedPath_3a3f292fe1666e00(arg0) {
    const ret = arg0.composedPath();
    return ret;
};

export function __wbg_contains_d94230fe806c1277(arg0, arg1, arg2) {
    const ret = arg0.contains(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_content_9bed079fac874e9e(arg0) {
    const ret = arg0.content;
    return ret;
};

export function __wbg_createComment_8bc5f42232aeee70(arg0, arg1, arg2) {
    const ret = arg0.createComment(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_createElementNS_494cc14f5fdee138() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    return ret;
}, arguments) };

export function __wbg_createElement_89923fcb809656b7() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments) };

export function __wbg_createTextNode_457c122eb9cb5753(arg0, arg1, arg2) {
    const ret = arg0.createTextNode(getStringFromWasm0(arg1, arg2));
    return ret;
};

export function __wbg_createTreeWalker_73a0cea2dd73fcf3() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createTreeWalker(arg1, arg2 >>> 0, arg3);
    return ret;
}, arguments) };

export function __wbg_crypto_ed58b8e10a292839(arg0) {
    const ret = arg0.crypto;
    return ret;
};

export function __wbg_ctrlKey_5c308955b0d5492d(arg0) {
    const ret = arg0.ctrlKey;
    return ret;
};

export function __wbg_deleteProperty_0ccc7fae163f60ac() { return handleError(function (arg0, arg1) {
    const ret = Reflect.deleteProperty(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_disconnect_bae30ff6ba855cc8(arg0) {
    arg0.disconnect();
};

export function __wbg_document_f11bc4f7c03e1745(arg0) {
    const ret = arg0.document;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_done_f22c1561fa919baa(arg0) {
    const ret = arg0.done;
    return ret;
};

export function __wbg_enqueue_3997a55771b5212a() { return handleError(function (arg0, arg1) {
    arg0.enqueue(arg1);
}, arguments) };

export function __wbg_entries_4f2bb9b0d701c0f6(arg0) {
    const ret = Object.entries(arg0);
    return ret;
};

export function __wbg_error_fab41a42d22bf2bc(arg0) {
    console.error(arg0);
};

export function __wbg_fetch_e26fdd92ea39f634(arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
};

export function __wbg_firstChild_203f86762016f65c() { return handleError(function (arg0) {
    const ret = arg0.firstChild();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_firstChild_eab602fcd6d180b4(arg0) {
    const ret = arg0.firstChild;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_firstElementChild_6b0187ab8d56aa11(arg0) {
    const ret = arg0.firstElementChild;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_focus_35fe945f7268dd62() { return handleError(function (arg0) {
    arg0.focus();
}, arguments) };

export function __wbg_getAttributeNames_0a0ee6c707b088f1(arg0) {
    const ret = arg0.getAttributeNames();
    return ret;
};

export function __wbg_getAttribute_3104455bb78f9b7b(arg0, arg1, arg2, arg3) {
    const ret = arg1.getAttribute(getStringFromWasm0(arg2, arg3));
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_getBoundingClientRect_05c4b9e3701bb372(arg0) {
    const ret = arg0.getBoundingClientRect();
    return ret;
};

export function __wbg_getComputedStyle_8e58bbd76370e2b1() { return handleError(function (arg0, arg1) {
    const ret = arg0.getComputedStyle(arg1);
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_getElementById_dcc9f1f3cfdca0bc(arg0, arg1, arg2) {
    const ret = arg0.getElementById(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_getPropertyValue_66c16bac362c6d90() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.getPropertyValue(getStringFromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_getRandomValues_bcb4912f16000dc4() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments) };

export function __wbg_get_9aa3dff3f0266054(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

export function __wbg_get_bbccf8970793c087() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_getwithrefkey_1dc361bd10053bfe(arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
};

export function __wbg_hash_4227a319264c4ca1() { return handleError(function (arg0, arg1) {
    const ret = arg1.hash;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };

export function __wbg_head_b2a8efba58be4fbd(arg0) {
    const ret = arg0.head;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_height_854c8d8584c709bc(arg0) {
    const ret = arg0.height;
    return ret;
};

export function __wbg_host_428e6a6189a92c91(arg0) {
    const ret = arg0.host;
    return ret;
};

export function __wbg_id_87f2e8c82a04a251(arg0, arg1) {
    const ret = arg1.id;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_innerHeight_96729fe7becd5e5e() { return handleError(function (arg0) {
    const ret = arg0.innerHeight;
    return ret;
}, arguments) };

export function __wbg_innerWidth_1df84d4ccf59c207() { return handleError(function (arg0) {
    const ret = arg0.innerWidth;
    return ret;
}, arguments) };

export function __wbg_insertBefore_4b32ede81cf15b43() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.insertBefore(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_instanceof_ArrayBuffer_670ddde44cdb2602(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Element_0f1680908791f190(arg0) {
    let result;
    try {
        result = arg0 instanceof Element;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Error_2b29c5b4afac4e22(arg0) {
    let result;
    try {
        result = arg0 instanceof Error;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_HtmlElement_d94ed69c6883a691(arg0) {
    let result;
    try {
        result = arg0 instanceof HTMLElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Response_d3453657e10c4300(arg0) {
    let result;
    try {
        result = arg0 instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_ShadowRoot_184d5b63318b09e5(arg0) {
    let result;
    try {
        result = arg0 instanceof ShadowRoot;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Uint8Array_28af5bc19d6acad8(arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Window_d2514c6a7ee7ba60(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_isArray_1ba11a930108ec51(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
};

export function __wbg_is_e442492d1fb7967b(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
};

export function __wbg_iterator_23604bb983791576() {
    const ret = Symbol.iterator;
    return ret;
};

export function __wbg_json_2c755d0be3f5cc5c() { return handleError(function (arg0) {
    const ret = arg0.json();
    return ret;
}, arguments) };

export function __wbg_key_9a40d4f6defa675b(arg0, arg1) {
    const ret = arg1.key;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_lastChild_cb8e312682577e07() { return handleError(function (arg0) {
    const ret = arg0.lastChild();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_left_d79d7167a89a5169(arg0) {
    const ret = arg0.left;
    return ret;
};

export function __wbg_length_65d1cd11729ced11(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_length_d65cf0786bfc5739(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_location_b2ec7e36fec8a8ff(arg0) {
    const ret = arg0.location;
    return ret;
};

export function __wbg_log_464d1b2190ca1e04(arg0) {
    console.log(arg0);
};

export function __wbg_message_7bde112094278773(arg0) {
    const ret = arg0.message;
    return ret;
};

export function __wbg_metaKey_90fbd812345a7e0c(arg0) {
    const ret = arg0.metaKey;
    return ret;
};

export function __wbg_msCrypto_0a36e2ec3a343d26(arg0) {
    const ret = arg0.msCrypto;
    return ret;
};

export function __wbg_name_ae6b09babb81aa7d(arg0) {
    const ret = arg0.name;
    return ret;
};

export function __wbg_new_2b7a506882df463d() { return handleError(function (arg0) {
    const ret = new MutationObserver(arg0);
    return ret;
}, arguments) };

export function __wbg_new_35d748855c4620b9() { return handleError(function () {
    const ret = new Headers();
    return ret;
}, arguments) };

export function __wbg_new_3d446df9155128ef(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_54(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_new_3ff5b33b1ce712df(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_new_6799ef630abee97c(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_new_688846f374351c92() {
    const ret = new Object();
    return ret;
};

export function __wbg_newnoargs_fd9e4bf8be2bc16d(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_ba35896968751d91(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithlength_34ce8f1051e74449(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
};

export function __wbg_newwithstrandinit_a1f6583f20e4faff() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
}, arguments) };

export function __wbg_nextNode_10aab3722092b5f3() { return handleError(function (arg0) {
    const ret = arg0.nextNode();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_nextSibling_f1b7916c306c9a9f(arg0) {
    const ret = arg0.nextSibling;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_next_01dd9234a5bf6d05() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments) };

export function __wbg_next_137428deb98342b0(arg0) {
    const ret = arg0.next;
    return ret;
};

export function __wbg_nodeType_d2ff06a7cd3be418(arg0) {
    const ret = arg0.nodeType;
    return ret;
};

export function __wbg_node_02999533c4ea02e3(arg0) {
    const ret = arg0.node;
    return ret;
};

export function __wbg_observe_9340e07f32e30b1a() { return handleError(function (arg0, arg1, arg2) {
    arg0.observe(arg1, arg2);
}, arguments) };

export function __wbg_offsetHeight_fd6bd1cef9ee2d02(arg0) {
    const ret = arg0.offsetHeight;
    return ret;
};

export function __wbg_offsetWidth_8550d6d56c0b93ed(arg0) {
    const ret = arg0.offsetWidth;
    return ret;
};

export function __wbg_parentElement_41c6f5f746ea74cf(arg0) {
    const ret = arg0.parentElement;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_parentNode_dfffcfb63c8a6cac(arg0) {
    const ret = arg0.parentNode;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_prepend_7f887953206740f2() { return handleError(function (arg0, arg1) {
    arg0.prepend(arg1);
}, arguments) };

export function __wbg_preventDefault_3c86e59772d015e6(arg0) {
    arg0.preventDefault();
};

export function __wbg_previousNode_eaf5a28b9b325eb1() { return handleError(function (arg0) {
    const ret = arg0.previousNode();
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_process_5c1d670bc53614b8(arg0) {
    const ret = arg0.process;
    return ret;
};

export function __wbg_querySelector_456a4fe7f2caa8a5() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_querySelector_7b4362006fdeda68() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments) };

export function __wbg_queueMicrotask_2181040e064c0dc8(arg0) {
    queueMicrotask(arg0);
};

export function __wbg_queueMicrotask_ef9ac43769cbcc4f(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbg_randomFillSync_ab2cfe79ebbf2740() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments) };

export function __wbg_removeAttribute_013475d9f18db70a() { return handleError(function (arg0, arg1, arg2) {
    arg0.removeAttribute(getStringFromWasm0(arg1, arg2));
}, arguments) };

export function __wbg_removeChild_c6861558b785880c() { return handleError(function (arg0, arg1) {
    const ret = arg0.removeChild(arg1);
    return ret;
}, arguments) };

export function __wbg_removeEventListener_6f4cfa6f356575bb() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
}, arguments) };

export function __wbg_removeEventListener_a9ca9f05245321f0() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments) };

export function __wbg_remove_530b4f3163f72a83(arg0) {
    arg0.remove();
};

export function __wbg_remove_9bf4522084e1efca() { return handleError(function (arg0, arg1, arg2) {
    arg0.remove(getStringFromWasm0(arg1, arg2));
}, arguments) };

export function __wbg_remove_a32febffb592d2d5(arg0) {
    arg0.remove();
};

export function __wbg_remove_f1b7a3bf5cd95986() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.remove(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_requestAnimationFrame_169cbbda5861d9ca() { return handleError(function (arg0, arg1) {
    const ret = arg0.requestAnimationFrame(arg1);
    return ret;
}, arguments) };

export function __wbg_require_79b1e9274cde3c87() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments) };

export function __wbg_resolve_0bf7c44d641804f9(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_respond_88fe7338392675f2() { return handleError(function (arg0, arg1) {
    arg0.respond(arg1 >>> 0);
}, arguments) };

export function __wbg_right_74bde7fc03836700(arg0) {
    const ret = arg0.right;
    return ret;
};

export function __wbg_root_15ec812bf9c22c61(arg0) {
    const ret = arg0.root;
    return ret;
};

export function __wbg_scrollIntoView_53456dfc718c03ed(arg0) {
    arg0.scrollIntoView();
};

export function __wbg_scrollIntoView_ab0104255a2bac2b(arg0, arg1) {
    arg0.scrollIntoView(arg1);
};

export function __wbg_scrollIntoView_ecb2cd8b479f043f(arg0, arg1) {
    arg0.scrollIntoView(arg1 !== 0);
};

export function __wbg_scrollLeft_f3a8f95470760df7(arg0) {
    const ret = arg0.scrollLeft;
    return ret;
};

export function __wbg_scrollTop_819aa0f7d4b47697(arg0) {
    const ret = arg0.scrollTop;
    return ret;
};

export function __wbg_setAttribute_148e0e65e20e5f27() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setProperty_0eb9705cf1b05650() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_setTimeout_8d2afdcdb34b4e5a() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.setTimeout(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_set_23d69db4e5c66a6e(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_set_4e647025551483bd() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_setacceptnode_2a6823b7a6461ca0(arg0, arg1) {
    arg0.acceptNode = arg1;
};

export function __wbg_setbehavior_e7cbaa29c624a8c5(arg0, arg1) {
    arg0.behavior = __wbindgen_enum_ScrollBehavior[arg1];
};

export function __wbg_setblock_a569de8505c363dd(arg0, arg1) {
    arg0.block = __wbindgen_enum_ScrollLogicalPosition[arg1];
};

export function __wbg_setchildlist_1bd7d8906f7fcbe9(arg0, arg1) {
    arg0.childList = arg1 !== 0;
};

export function __wbg_setcurrentNode_cb1f551ea982e70e(arg0, arg1) {
    arg0.currentNode = arg1;
};

export function __wbg_setheaders_4c921e8e226bdfa7(arg0, arg1) {
    arg0.headers = arg1;
};

export function __wbg_setinnerHTML_2d75307ba8832258(arg0, arg1, arg2) {
    arg0.innerHTML = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setmethod_cfc7f688ba46a6be(arg0, arg1, arg2) {
    arg0.method = getStringFromWasm0(arg1, arg2);
};

export function __wbg_setnodeValue_2bdce51097cd14f6(arg0, arg1, arg2) {
    arg0.nodeValue = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
};

export function __wbg_setscrollLeft_2430868b31aa9541(arg0, arg1) {
    arg0.scrollLeft = arg1;
};

export function __wbg_setscrollTop_7fbe5f542fe73dab(arg0, arg1) {
    arg0.scrollTop = arg1;
};

export function __wbg_setsubtree_d2c8321889fbd11e(arg0, arg1) {
    arg0.subtree = arg1 !== 0;
};

export function __wbg_settextContent_0eab7fce6c07d5c9(arg0, arg1, arg2) {
    arg0.textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
};

export function __wbg_static_accessor_GLOBAL_0be7472e492ad3e3() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_1dc398a895c82351() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_ae1c80c7eea8d64a() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_stopPropagation_da43a41fec77962c(arg0) {
    arg0.stopPropagation();
};

export function __wbg_style_53bb2d762dd1c030(arg0) {
    const ret = arg0.style;
    return ret;
};

export function __wbg_subarray_46adeb9b86949d12(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_tagName_30372cb4f9f8fe13(arg0, arg1) {
    const ret = arg1.tagName;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_target_a8fe593e7ee79c21(arg0) {
    const ret = arg0.target;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_then_0438fad860fe38e1(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_then_0ffafeddf0e182a4(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};

export function __wbg_toString_cbcf95f260c441ae(arg0) {
    const ret = arg0.toString();
    return ret;
};

export function __wbg_top_640e0509d882f0ee(arg0) {
    const ret = arg0.top;
    return ret;
};

export function __wbg_value_47fde8ea2d9fdcd5(arg0, arg1) {
    const ret = arg1.value;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_value_4c32fd138a88eee2(arg0) {
    const ret = arg0.value;
    return ret;
};

export function __wbg_versions_c71aa1626a93e0a1(arg0) {
    const ret = arg0.versions;
    return ret;
};

export function __wbg_view_a03cbb1d55c73e57(arg0) {
    const ret = arg0.view;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_width_36ca6e422d0da22f(arg0) {
    const ret = arg0.width;
    return ret;
};

export function __wbg_y_fd817e2108616912(arg0) {
    const ret = arg0.y;
    return ret;
};

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_closure_wrapper1218(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_44);
    return ret;
};

export function __wbindgen_closure_wrapper1333(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_44);
    return ret;
};

export function __wbindgen_closure_wrapper1336(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_54);
    return ret;
};

export function __wbindgen_closure_wrapper2634(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_44);
    return ret;
};

export function __wbindgen_closure_wrapper2653(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 40, __wbg_adapter_59);
    return ret;
};

export function __wbindgen_closure_wrapper534(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_44);
    return ret;
};

export function __wbindgen_closure_wrapper539(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 40, __wbg_adapter_47);
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbindgen_in(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_4;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_is_falsy(arg0) {
    const ret = !arg0;
    return ret;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = arg0 === null;
    return ret;
};

export function __wbindgen_is_object(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbindgen_json_serialize(arg0, arg1) {
    const obj = arg1;
    const ret = JSON.stringify(obj === undefined ? null : obj);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_jsval_loose_eq(arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

