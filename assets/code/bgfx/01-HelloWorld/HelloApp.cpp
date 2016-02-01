#include "common.h"
#include <bgfx/bgfx.h>
#include <chrono>

class App : public entry::AppI
{
public:
    virtual ~App(){};        
    virtual void init(int _argc, char** _argv) override
    {
        
        bool initialized = bgfx::init();
        if( initialized )
        {
            bgfx::reset(m_width, m_height, m_reset);
            // Enable debug text.
            bgfx::setDebug(m_debug);
            // Set view 0 clear state.
            bgfx::setViewClear(0
                , BGFX_CLEAR_COLOR|BGFX_CLEAR_DEPTH|BGFX_CLEAR_STENCIL
                , 0x203030ff
                , 1.0f
                , 0
                );
        }
    }
        
    virtual int  shutdown() override
    {
        bgfx::shutdown();
        return 0;
    }
        
    virtual bool update() override
    {
        bool succeed = false;
        if (!entry::processEvents(m_width, m_height, m_debug, m_reset) )
        {
            // Set view 0 default viewport.
            bgfx::setViewRect(0, 0, 0, m_width, m_height);

            // This dummy draw call is here to make sure that view 0 is cleared
            // if no other draw calls are submitted to view 0.
            bgfx::touch(0);

            // Use debug font to print information about this example.
            bgfx::dbgTextClear();
            bgfx::dbgTextPrintf(0, 0, 0x5f, "Entry:HelloApp");
            // Advance to next frame. Rendering thread will be kicked to
            // process submitted rendering primitives.
            bgfx::frame();
            
            succeed = true;
        }
        return succeed;
    }
    
protected:
    unsigned m_width  = 1280; // Window width
    unsigned m_height = 720;  // Window height
    unsigned m_debug  = BGFX_DEBUG_TEXT;
    unsigned m_reset  = BGFX_RESET_VSYNC;
};

App app;

int _main_(int _argc, char** _argv)
{
    return entry::runApp(&app,_argc,_argv);
}
