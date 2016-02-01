#include "common.h"
#include <bgfx/bgfx.h>

int _main_(int _argc, char** _argv)
{
    unsigned width = 1280;
    unsigned height = 720;
    unsigned debug = BGFX_DEBUG_TEXT;
    unsigned reset = BGFX_RESET_VSYNC;
    bool initialed = bgfx::init();
    if( initialed )
    {
        bgfx::reset(width, height, reset);
        // Enable debug text.
        bgfx::setDebug(debug);
        // Set view 0 clear state.
        bgfx::setViewClear(0
            , BGFX_CLEAR_COLOR|BGFX_CLEAR_DEPTH|BGFX_CLEAR_STENCIL
            , 0x203030ff
            , 1.0f
            , 0
            );
        
        while (!entry::processEvents(width, height, debug, reset) )
        {            
            // Set view 0 default viewport.
            bgfx::setViewRect(0, 0, 0, width, height);

            // This dummy draw call is here to make sure that view 0 is cleared
            // if no other draw calls are submitted to view 0.
            bgfx::touch(0);

            // Use debug font to print information about this example.
            bgfx::dbgTextClear();
            bgfx::dbgTextPrintf(0, 0, 0x4f, "Entry:HelloWorld");
            // Advance to next frame. Rendering thread will be kicked to
            // process submitted rendering primitives.
            bgfx::frame();
        }
    }
    // Shutdown bgfx.
    bgfx::shutdown();
    return 0;
}
